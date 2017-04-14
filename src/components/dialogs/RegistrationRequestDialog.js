import React, { PropTypes, PureComponent } from 'react'
import RegistrationRequestForm from '../../components/forms/RegistrationRequestForm'
import { HeroPromotionCredits } from '../../components/heros/HeroParts'
import BackgroundImage from '../../components/assets/BackgroundImage'
import { DismissButton } from '../../components/buttons/Buttons'

class RegistrationRequestDialog extends PureComponent {

  static propTypes = {
    promotional: PropTypes.object.isRequired,
  }

  render() {
    const { promotional } = this.props
    return (
      <div className="AuthenticationFormDialog inModal">
        <BackgroundImage
          className="hasOverlay6"
          dpi={'xhdpi'}
          isBackground
          sources={promotional.get('coverImage')}
        />
        <RegistrationRequestForm inModal />
        <HeroPromotionCredits sources={promotional.get('avatar')} label="Posted by" username={promotional.get('username')} />
        <DismissButton />
      </div>
    )
  }
}

export default RegistrationRequestDialog

