import React, { PropTypes } from 'react'
import { css, media, select } from '../../styles/jss'
import { minBreak3, mt0, overflowHidden, pl0 } from '../../styles/jso'

const panelStyle = css(
  { paddingLeft: 30 },
  overflowHidden,
  select('& > p:first-child', mt0),
  select('.TreeButton.isCollapsed + &', { height: 0 }),
  media(minBreak3, pl0),
)

const TreePanel = ({ children }) =>
  <div className={`TreePanel ${panelStyle}`}>
    {children}
  </div>

TreePanel.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TreePanel

