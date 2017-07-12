import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import { selectOnboardingCreatorTypeFiltered } from 'ello-brains/selectors/categories'
import { ONBOARDING_VERSION } from 'ello-brains/constants/application_types'
// import { selectUuid } from 'ello-brains/selectors/profile'
import { getCreatorType } from '../actions/discover'
import { followCreatorType, saveProfile } from '../actions/profile'

function mapStateToProps(state) {
  return {
    // categories: selectOnboardingCreatorTypeFiltered(state),
    // uuid: selectUuid(state),
  }
}

class OnboardingCreatorTypeContainer extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    nextLabel: PropTypes.string,
    onNextClick: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      nextLabel: 'Create Account',
      onNextClick: this.onNextClick,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getCreatorType())
    this.state = { creatorType: null }
  }

  onNextClick = () => {
    const { dispatch } = this.props
    const categoryIds = this.state.categoryIds
    dispatch(saveProfile({ web_onboarding_version: ONBOARDING_VERSION }))
    dispatch(followCreatorType(categoryIds))
    dispatch(push('/onboarding/categories'))
  }

  render() {
    return (
      <div>Creator Type</div>
    )
  }
}

export default connect(mapStateToProps)(OnboardingCreatorTypeContainer)

