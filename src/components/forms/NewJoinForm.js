import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import debounce from 'lodash/debounce'
import { isAndroid } from '../../lib/jello'
import { FORM_CONTROL_STATUS as STATUS } from '../../constants/status_types'
import { trackEvent } from '../../actions/analytics'
import { getInviteEmail } from '../../actions/invitations'
import { checkAvailability, resetAvailability, signUpUser } from '../../actions/profile'
import EmailControl from './EmailControl'
import FormButton from './FormButton'
import PasswordControl from './PasswordControl'
import UsernameControl from './UsernameControl'
import {
  getEmailStateFromClient,
  getEmailStateFromServer,
  getInvitationCodeStateFromServer,
  getPasswordState,
  getUsernameStateFromClient,
  getUsernameStateFromServer,
  isFormValid,
} from './Validators'
import { invite } from '../../networking/api'
import { selectParamsInvitationCode } from '../../selectors/params'
import { selectAvailability, selectEmail } from '../../selectors/profile'
import {
  addPageVisibilityObserver,
  removePageVisibilityObserver,
} from '../viewport/PageVisibilityComponent'

function renderStatus(state) {
  return () => {
    if (state.status === STATUS.FAILURE) {
      return <p className="FormControlStatusMessage">{state.message}</p>
    }
    return ''
  }
}

function mapStateToProps(state, props) {
  return {
    availability: selectAvailability(state),
    email: selectEmail(state),
    invitationCode: selectParamsInvitationCode(state, props),
  }
}

class NewJoinForm extends Component {

  static propTypes = {
    availability: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    email: PropTypes.string,
    inModal: PropTypes.bool,
  }

  static defaultProps = {
    availability: null,
    email: null,
    inModal: false,
  }

  componentWillMount() {
    this.state = {
      emailState: { status: STATUS.INDETERMINATE, message: '' },
      formStatus: STATUS.INDETERMINATE,
      invitationCodeState: { status: STATUS.INDETERMINATE, message: '' },
      passwordState: { status: STATUS.INDETERMINATE, message: '' },
      showPasswordError: false,
      showUsernameError: false,
      usernameState: { status: STATUS.INDETERMINATE, suggestions: null, message: '' },
    }

    this.emailValue = ''
    this.usernameValue = ''
    this.passwordValue = ''

    this.checkServerForAvailability = debounce(this.checkServerForAvailability, 666)
    this.delayedShowUsernameError = debounce(this.delayedShowUsernameError, 1000)
    this.delayedShowPasswordError = debounce(this.delayedShowPasswordError, 1000)
  }

  componentDidMount() {
    addPageVisibilityObserver(this)
    this.checkForInviteCode(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { availability } = nextProps
    if (nextProps.email !== this.props.email) {
      this.checkForInviteCode(nextProps)
    }
    if (!availability) { return }
    if (availability.has('invitationCode')) {
      this.validateInvitationCodeResponse(availability)
    }
    if (availability.has('email')) {
      this.validateEmailResponse(availability)
    }
    if (availability.has('username')) {
      this.validateUsernameResponse(availability)
    }
  }

  componentWillUnmount() {
    removePageVisibilityObserver(this)
  }

  onBeforeUnload() {
    const { dispatch } = this.props
    const { formStatus } = this.state
    if (formStatus !== STATUS.SUBMITTED) {
      dispatch(trackEvent('modal-registration-request-abandonment'))
    }
  }

  onChangeEmailControl = ({ email }) => {
    this.emailValue = email
    const { emailState } = this.state
    const currentStatus = emailState.status
    const clientState = getEmailStateFromClient({ value: email, currentStatus })
    if (clientState.status === STATUS.SUCCESS) {
      if (currentStatus !== STATUS.REQUEST) {
        this.setState({ emailState: { status: STATUS.REQUEST, message: 'checking...' } })
      }
      // This will end up landing on `validateEmailResponse` after fetching
      this.checkServerForAvailability({ email })
      return
    }
    if (currentStatus !== clientState.status) {
      this.setState({ emailState: clientState })
    }
  }

  onChangeUsernameControl = ({ username }) => {
    this.setState({ showUsernameError: false })
    this.delayedShowUsernameError()
    this.usernameValue = username
    const { usernameState } = this.state
    const currentStatus = usernameState.status
    const currentMessage = usernameState.message
    const clientState = getUsernameStateFromClient({ value: username, currentStatus })

    if (clientState.status === STATUS.SUCCESS) {
      if (currentStatus !== STATUS.REQUEST) {
        this.setState({ usernameState: { status: STATUS.REQUEST, message: 'checking...' } })
      }
      // This will end up landing on `validateUsernameResponse` after fetching
      this.checkServerForAvailability({ username })
      return
    }
    if (clientState.status !== currentStatus && clientState.message !== currentMessage) {
      this.setState({ usernameState: clientState })
    }
  }

  onChangePasswordControl = ({ password }) => {
    this.setState({ showPasswordError: false })
    this.delayedShowPasswordError()
    this.passwordValue = password
    const { passwordState } = this.state
    const currentStatus = passwordState.status
    const newState = getPasswordState({ value: password, currentStatus })
    if (newState.status !== currentStatus) {
      this.setState({ passwordState: newState })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    // const { emailState } = this.state
    // if (emailState.status === STATUS.SUCCESS) {
    //   this.setState({ emailState: { status: STATUS.REQUEST, message: 'checking...' } })
    //   this.checkServerForAvailability({ email: this.emailValue, is_signup: true })
    // }
    const { dispatch } = this.props
    dispatch(
      signUpUser(this.emailValue, this.usernameValue, this.passwordValue, this.invitationCodeValue),
    )
  }

  checkForInviteCode(props) {
    const { dispatch, email, invitationCode } = props
    if (invitationCode) {
      this.invitationCodeValue = invitationCode
    }
    if (invitationCode && !email) {
      dispatch(getInviteEmail(invitationCode))
    } else if (email) {
      this.emailValue = email
      document.body.querySelector('.JoinEmailControl input').value = this.emailValue
      requestAnimationFrame(() => {
        this.setState({ emailState: { status: STATUS.SUCCESS } })
      })
    }
  }

  checkServerForAvailability(vo) {
    this.props.dispatch(checkAvailability(vo))
  }

  validateEmailResponse(availability) {
    const { dispatch, inModal } = this.props
    const { emailState } = this.state
    const currentStatus = emailState.status
    const newState = getEmailStateFromServer({ availability, currentStatus })
    if (newState.status === STATUS.SUCCESS && availability.getIn(['original', 'is_signup'])) {
      dispatch(resetAvailability())
      if (inModal) {
        dispatch(trackEvent('modal-registration-request-form-completion'))
      }
      this.setState({ formStatus: STATUS.SUBMITTED })
    } else {
      this.setState({ emailState: newState })
    }
  }

  validateInvitationCodeResponse(availability) {
    const { invitationCodeState } = this.state
    const currentStatus = invitationCodeState.status
    const newState = getInvitationCodeStateFromServer({ availability, currentStatus })
    if (newState.status !== currentStatus) {
      this.setState({ invitationCodeState: newState })
    }
  }

  validateUsernameResponse(availability) {
    if (!this.usernameValue.length) {
      this.setState({
        usernameState: { message: '', status: STATUS.INDETERMINATE, suggestions: null },
      })
      return
    }
    const { usernameState } = this.state
    const currentStatus = usernameState.status
    const newState = getUsernameStateFromServer({ availability, currentStatus })
    if (newState.status !== currentStatus) {
      this.setState({ usernameState: newState })
    }
  }

  delayedShowPasswordError = () => {
    if (this.passwordValue.length) {
      this.setState({ showPasswordError: true })
    }
  }

  delayedShowUsernameError = () => {
    if (this.usernameValue.length) {
      this.setState({ showUsernameError: true })
    }
  }

  renderEmailForm() {
    const {
      emailState,
      passwordState,
      showPasswordError,
      showUsernameError,
      usernameState,
    } = this.state
    const { message, status } = emailState
    const isValid = isFormValid([emailState, usernameState, passwordState])
    const showMessage = (message && message.length) &&
      (status === STATUS.FAILURE || status === STATUS.SUCCESS)
    const domain = ENV.AUTH_DOMAIN
    return (
      <div className="NewJoinForm RegistrationRequestForm JoinForm">
        <h1>
          Join The Creators Network.
        </h1>
        <h2>
          Be part of what&apos;s next in art, design, fashion, web culture & more.
        </h2>
        <form
          action={invite().path}
          className="AuthenticationForm"
          id="NewJoinForm"
          method="POST"
          noValidate="novalidate"
          onSubmit={this.onSubmit}
          role="form"
        >
          <EmailControl
            autoFocus={!this.emailValue || !(this.emailValue && this.emailValue.length)}
            classList="isBoxControl JoinEmailControl"
            label="Email"
            onChange={this.onChangeEmailControl}
            onBlur={isAndroid() ? () => document.body.classList.remove('isCreditsHidden') : null}
            onFocus={isAndroid() ? () => document.body.classList.add('isCreditsHidden') : null}
            tabIndex="1"
          />
          <UsernameControl
            autoFocus={this.emailValue && this.emailValue.length}
            classList="isBoxControl"
            label="Username"
            onChange={this.onChangeUsernameControl}
            placeholder="Username"
            status={usernameState.status}
            renderStatus={showUsernameError ? renderStatus(usernameState) : null}
            suggestions={usernameState.suggestions}
            tabIndex="2"
          />
          <PasswordControl
            classList="isBoxControl"
            label="Password"
            onChange={this.onChangePasswordControl}
            placeholder="Password"
            status={passwordState.status}
            renderStatus={showPasswordError ? renderStatus(passwordState) : null}
            tabIndex="3"
          />
          {showMessage &&
            <p className="HoppyStatusMessage hasContent">{message}</p>
          }
          <FormButton className="FormButton isRounded isGreen" disabled={!isValid} tabIndex="2">
            Sign up
          </FormButton>
        </form>
        <p className="AuthenticationTermsCopy">
          By continuing you are agreeing to our <a href={`${domain}/wtf/post/policies`}>Terms</a>.
        </p>
        <Link className="HaveAccountLink" to="/enter">Already have an account?</Link>
      </div>
    )
  }

  render() {
    const { formStatus } = this.state
    return formStatus === STATUS.SUBMITTED ? this.renderSignupForm() : this.renderEmailForm()
  }
}

export default connect(mapStateToProps)(NewJoinForm)

