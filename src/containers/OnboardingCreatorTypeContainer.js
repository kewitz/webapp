import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { selectCreatorTypeCategories } from 'ello-brains/selectors/categories'
import { getCategories } from '../actions/discover'
import { saveProfile } from '../actions/profile'
import OnboardingCreatorType from '../components/onboarding/OnboardingCreatorType'
import OnboardingNavbar from '../components/onboarding/OnboardingNavbar'
import { css, media, select } from '../styles/jss'
import * as s from '../styles/jso'

const containerStyle = css(
  s.flex,
  s.itemsCenter,
  s.mxAuto,
  s.p10,
  { height: 'calc(100vh - 70px)', marginTop: 70, maxWidth: 490 },
  media(s.minBreak2, s.mt0, { height: 'calc(100hv - 100px)' }),
  select('> div', s.fullWidth),
)

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
    onClickFan: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      nextLabel: 'Create Account',
      onClickFan: this.onClickFan,
      onNextClick: this.onNextClick,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getCategories())
    this.state = { categoryIds: [] }
  }

  onCategoryClick = (id) => {
    const ids = [...this.state.categoryIds]
    const index = ids.indexOf(id)
    if (index === -1) {
      ids.push(id)
    } else {
      ids.splice(index, 1)
    }
    this.setState({ categoryIds: ids })
  }

  onClickFan = () => {
    this.setState({ categoryIds: [] }, () => this.onNextClick())
  }

  onNextClick = () => {
    const { dispatch } = this.props
    dispatch(saveProfile({ creator_type_category_ids: this.state.categoryIds }))
    dispatch(push('/onboarding/categories'))
  }

  render() {
    return (
      <div className={containerStyle}>
        <OnboardingCreatorType
          categories={this.props.categories}
          onCategoryClick={this.onCategoryClick}
        />
        <OnboardingNavbar />
      </div>
    )
  }
}

export default connect(mapStateToProps)(OnboardingCreatorTypeContainer)

