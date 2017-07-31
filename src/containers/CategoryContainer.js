import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CategoryLink } from '../components/buttons/Buttons'
import {
  selectCategoryName,
  selectCategorySlug,
  selectCategoryTileImageUrl,
} from '../selectors/categories'

function mapStateToProps(state, props) {
  return {
    name: selectCategoryName(state, props),
    slug: selectCategorySlug(state, props),
    tileImageUrl: selectCategoryTileImageUrl(state, props),
  }
}

class CategoryContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    tileImageUrl: PropTypes.string.isRequired,
  }
  render() {
    const { name, slug, tileImageUrl } = this.props
    return (
      <CategoryLink imageUrl={tileImageUrl} to={`/discover/${slug}`} >
        {name}
      </CategoryLink>
    )
  }
}

export default connect(mapStateToProps)(CategoryContainer)

