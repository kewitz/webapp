/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import OnboardingNavbar from './OnboardingNavbar'
import { css, hover, media, modifier, select } from '../../styles/jss'
import * as s from '../../styles/jso'

const containerStyle = css(
  s.flex,
  s.itemsCenter,
  s.mxAuto,
  s.p10,
  { height: 'calc(100vh - 70px)', marginTop: 70, maxWidth: 490 },
  media(s.minBreak2, s.mt0, { height: 'calc(100hv - 100px)' }),
  select('> div', s.fullWidth),
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

const buttonStyle = css(
  s.bgcWhite,
  s.borderA,
  s.center,
  s.colorA,
  s.mb10,
  s.mr10,
  s.px5,
  s.truncate,
  {
    borderRadius: 5,
    height: 40,
    maxWidth: 230,
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
    width: 'calc(50% - 5px)',
  },
  hover(s.colorWhite, s.bgcBlack, s.borderBlack),
  modifier('.isActive', s.colorWhite, s.bgcBlack, s.borderBlack),
  select(':nth-child(2n)', s.mr0),
)

const catButtonStyle = css(
  { ...buttonStyle },
  { maxWidth: 150 },
  media('(min-width: 26.25em)', // 420 / 16 = 26.25em
    { width: 'calc(33% - 6px)' },
    select(':nth-child(2n)', s.mr10),
    select(':nth-child(3n)', s.mr0),
  ),
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
      <div className="Onboarding OnboardingCreatorType">
        <div className={containerStyle}>
          <div>
            <h2 className={headerStyle}>I am here as:</h2>
            <div>
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
                <div>
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
      </div>
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

