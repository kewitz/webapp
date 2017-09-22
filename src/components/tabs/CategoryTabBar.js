import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'

const backgroundStyles = source => ({
  backgroundImage: `url("${source}")`,
})

const CategoryTab = (props) => {
  const { isActive, label, source, to } = props
  return (
    <Link
      className={classNames('CategoryTab', { isActive })}
      to={to}
      style={source ? backgroundStyles(source) : null}
    >
      <span className="CategoryTabLabel">{label}</span>
    </Link>
  )
}

CategoryTab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export const CategoryTabBar = (props) => {
  const { pathname, tabs } = props
  return (
    <div className="CategoryTabBar">
      <nav className="CategoryTabs">
        {tabs.map(tab =>
          (<CategoryTab
            isActive={(tab.activePattern ? tab.activePattern.test(pathname) : tab.to === pathname)}
            key={`CategoryTab_${tab.to}`}
            label={tab.label}
            source={tab.source}
            to={tab.to}
          />),
        )}
      </nav>
      <div className="CategoryTabBarUtility">
        <Link
          activeClassName="isActive"
          className="CategoryUtilTab"
          to="/discover/all"
        >
          <span>See All</span>
        </Link>
      </div>
    </div>
  )
}

CategoryTabBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
}

export default CategoryTabBar
