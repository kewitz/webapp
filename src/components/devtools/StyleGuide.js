// @flow
import React from 'react'
import { MainView } from '../views/MainView'
// import StyleGuideIcons from './StyleGuideIcons'
import { css, media } from '../../styles/jss'
import { flex, fontSize18, fontSize24, minBreak2, mr10, pt20, pt40, py20, wrapperPaddingX } from '../../styles/jso'

const headerStyle = css(
  wrapperPaddingX,
  pt20,
  media(minBreak2, pt40),
)
const h1Style = css(fontSize24)
const navStyle = css(flex, py20)
const buttonStyle = css(fontSize18, mr10)

export default() =>
  <MainView className="StyleGuide">
    <header className={headerStyle}>
      <h1 className={h1Style}>Ello style guide</h1>
      <nav className={navStyle}>
        <button className={buttonStyle}>Icons</button>
      </nav>
    </header>
  </MainView>

    // <StyleGuideIcons />

