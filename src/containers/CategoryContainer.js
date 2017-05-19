import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectCategoryName,
  selectCategorySlug,
  selectCategoryTileImageUrl,
} from 'ello-brains/dist/selectors/categories'
import { CategoryLink } from '../components/buttons/Buttons'

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

