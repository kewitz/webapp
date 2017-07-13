/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import OnboardingNavbar from './OnboardingNavbar'
import { MainView } from '../views/MainView'
import { css, hover, modifier } from '../../styles/jss'
import * as s from '../../styles/jso'

const containerStyle = css(
  s.flex,
  s.justifyCenter,
  s.itemsCenter,
  s.contentCenter,
  { height: 'calc(100vh - 100px)' },
)

const headerStyle = css(
  s.colorA,
  s.sansRegular,
  s.fontSize24,
  s.mb20,
)

const catHeaderStyle = css(
  { ...headerStyle },
  { marginTop: 60 },
)

const buttonContainerStyle = css(
  s.flex,
  s.flexWrap,
  { maxWidth: 480 },
)

const buttonStyle = css(
  { borderRadius: 5, height: 50, width: 230 },
  s.colorA,
  s.center,
  s.bgcWhite,
  s.borderA,
  s.mr10,
  s.mb10,
  { transition: 'background-color 0.2s, border-color 0.2s, color 0.2s' },
  modifier('.isActive', s.colorWhite, s.bgcBlack, s.borderBlack),
  hover(s.colorWhite, s.bgcBlack, s.borderBlack),
)

const catButtonStyle = css(
  { ...buttonStyle },
  { width: 150 },
)

class CategoryButton extends PureComponent {

  static propTypes = {
    category: PropTypes.object.isRequired,
    onCategoryClick: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.state = { isActive: false }
  }

  onClick = () => {
    const { category, onCategoryClick } = this.props
    this.setState({ isActive: !this.state.isActive })
    onCategoryClick(category.get('id'))
  }

  render() {
    const { category } = this.props
    const { isActive } = this.state
    return (
      <button
        className={`${catButtonStyle} ${isActive ? 'isActive' : ''}`}
        onClick={this.onClick}
      >
        {category.get('name')}
      </button>
    )
  }
}

class OnboardingCreatorType extends PureComponent {

  componentWillMount() {
    this.state = { artistActive: false }
  }

  onClickArtist = () => {
    this.setState({ artistActive: !this.state.artistActive })
  }

  render() {
    const { categories, onCategoryClick } = this.props
    const { onClickFan } = this.context
    const { artistActive } = this.state
    return (
      <MainView className="Onboarding OnboardingCreatorType">
        <div className={containerStyle}>
          <div>
            <h2 className={headerStyle}>I am here as:</h2>
            <div className={buttonContainerStyle}>
              <button className={`${buttonStyle} ${artistActive ? 'isActive' : ''}`} onClick={this.onClickArtist}>
                An Artist
              </button>
              <button className={buttonStyle} onClick={onClickFan}>
                A Fan
              </button>
            </div>
            {artistActive &&
              <div>
                <h2 className={catHeaderStyle}>I make:</h2>
                <div className={buttonContainerStyle}>
                  {categories.map(cat => (
                    <CategoryButton
                      category={cat}
                      key={`category_${cat.get('id')}`}
                      onCategoryClick={onCategoryClick}
                    />
                  ))}
                </div>
              </div>
            }
          </div>
        </div>
        <OnboardingNavbar />
      </MainView>
    )
  }
}
OnboardingCreatorType.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
}
OnboardingCreatorType.contextTypes = {
  onClickFan: PropTypes.func.isRequired,
}

export default OnboardingCreatorType

