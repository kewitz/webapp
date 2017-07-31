import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { trackEvent } from '../actions/analytics'
import OnboardingCollaborate from '../components/onboarding/OnboardingCollaborate'
import { preferenceToggleChanged } from '../helpers/junk_drawer'
import {
  selectProfileIsCollaborateable,
  selectProfileIsHireable,
} from '../selectors/profile'

const prefs = [
  {
    id: 'isHireable',
    term: 'Get Hired',
    desc: 'Enable brands, publications, and people that want to pay you for your work to email you.',
  },
  {
    id: 'isCollaborateable',
    term: 'Collaborate',
    desc: 'Enable fellow creators that want to collaborate to email you.',
  },
]

function mapStateToProps(state) {
  return {
    isCollaborateable: selectProfileIsCollaborateable(state),
    isHireable: selectProfileIsHireable(state),
  }
}

class OnboardingCollaborateContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isCollaborateable: PropTypes.bool.isRequired,
    isHireable: PropTypes.bool.isRequired,
  }

  static childContextTypes = {
    nextLabel: PropTypes.string,
    onNextClick: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      nextLabel: 'Get To The Goods',
      onNextClick: this.onNextClick,
    }
  }

  shouldComponentUpdate() {
    return false
  }

  onNextClick = () => {
    const { dispatch } = this.props
    this.trackOnboardingEvents()
    dispatch(push('/following'))
  }

  trackOnboardingEvents = () => {
    const { dispatch, isCollaborateable, isHireable } = this.props
    if (isCollaborateable) {
      dispatch(trackEvent('Onboarding.Collaborate.isCollaborateable.Yes'))
    }
    if (isHireable) {
      dispatch(trackEvent('Onboarding.Collaborate.isHireable.Yes'))
    }
  }

  render() {
    return (
      <OnboardingCollaborate
        onToggleChange={preferenceToggleChanged}
        prefs={prefs}
      />
    )
  }
}

export default connect(mapStateToProps)(OnboardingCollaborateContainer)

