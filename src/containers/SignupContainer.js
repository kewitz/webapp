import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { MainView } from '../components/views/MainView'
import NewJoinForm from '../components/forms/NewJoinForm'
import RegistrationRequestForm from '../components/forms/RegistrationRequestForm'
import { splitStart } from '../actions/profile'
import { selectSplit, selectUuid } from '../selectors/profile'
import { getQueryParamValue } from '../helpers/uri_helper'

function mapStateToProps(state) {
  const querySplit = getQueryParamValue('split', document.location.href)
  return {
    joinFormVersion: querySplit || selectSplit(state, { splitName: 'signup_page_redesign' }),
    uuid: selectUuid(state),
  }
}

class SignupContainer extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    joinFormVersion: PropTypes.string,
    uuid: PropTypes.string.isRequired,
  }

  static defaultProps = {
    joinFormVersion: null,
  }

  componentWillMount() {
    const { dispatch, uuid } = this.props
    dispatch(splitStart(uuid, 'signup_page_redesign', 'old', 'new'))
  }

  render() {
    const { joinFormVersion } = this.props
    if (!joinFormVersion) { return null }
    return (
      <MainView className="Authentication">
        <div className="AuthenticationFormDialog">
          {joinFormVersion === 'old' ?
            <RegistrationRequestForm {...this.props} /> :
            <NewJoinForm />
          }
        </div>
      </MainView>
    )
  }

}

export default connect(mapStateToProps)(SignupContainer)

