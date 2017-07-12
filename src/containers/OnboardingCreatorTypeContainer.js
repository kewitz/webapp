import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { selectCreatorTypeCategories } from 'ello-brains/selectors/categories'
import { getCategories } from '../actions/discover'
import { saveProfile } from '../actions/profile'

function mapStateToProps(state) {
  return {
    categories: selectCreatorTypeCategories(state),
  }
}

class OnboardingCreatorTypeContainer extends PureComponent {

  static propTypes = {
    categories: PropTypes.array.isRequired,
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
    dispatch(getCategories())
    this.state = { categoryIds: [] }
  }

  onNextClick = () => {
    const { dispatch } = this.props
    dispatch(saveProfile({ creator_type_category_ids: this.state.categoryIds }))
    dispatch(push('/onboarding/categories'))
  }

  render() {
    console.log('cats', this.props.categories)
    return (
      <div>Creator Type</div>
    )
  }
}

export default connect(mapStateToProps)(OnboardingCreatorTypeContainer)

