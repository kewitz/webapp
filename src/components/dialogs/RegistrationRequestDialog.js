import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import NewJoinForm from '../../components/forms/NewJoinForm'
import RegistrationRequestForm from '../../components/forms/RegistrationRequestForm'
import { HeroPromotionCredits } from '../../components/heros/HeroParts'
import BackgroundImage from '../../components/assets/BackgroundImage'
import { XIcon } from '../../components/assets/Icons'
import { splitStart } from '../../actions/profile'
import { selectSplit, selectUuid } from '../../selectors/profile'
import { getQueryParamValue } from '../../helpers/uri_helper'

function mapStateToProps(state) {
  const querySplit = getQueryParamValue('split', document.location.href)
  return {
    joinFormVersion: querySplit || selectSplit(state, { splitName: 'signup_page_redesign' }),
    uuid: selectUuid(state),
  }
}

class RegistrationRequestDialog extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    joinFormVersion: PropTypes.string,
    promotional: PropTypes.object.isRequired,
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
    const { joinFormVersion, promotional } = this.props
    if (!joinFormVersion) { return null }
    return (
      <div className="AuthenticationFormDialog inModal">
        <BackgroundImage
          className="RegistrationRequestBackground hasOverlay6"
          dpi={'xhdpi'}
          isBackground
          sources={promotional.get('coverImage')}
        />
        {joinFormVersion === 'old' ? <RegistrationRequestForm inModal /> : <NewJoinForm inModal />}
        <HeroPromotionCredits sources={promotional.get('avatar')} label="Posted by" username={promotional.get('username')} />
        <button className="CloseModal XClose"><XIcon /></button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(RegistrationRequestDialog)

