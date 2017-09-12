import React from 'react'
import CreatorTypeContainer from '../../containers/CreatorTypeContainer'
import * as s from '../../styles/jso'
import { css, media } from '../../styles/jss'

const creatorTypeModalStyle = css(
  s.bgcWhite,
  s.fullWidth,
  s.mxAuto,
  s.p10,
  { borderRadius: 5, maxWidth: 510 },
  media(s.minBreak2, s.p20),
)

const titleStyle = css(
  s.colorBlack,
  s.fontSize18,
)

export default () => (
  <div className={creatorTypeModalStyle}>
    <h3 className={titleStyle}>Choose your creator type:</h3>
    <CreatorTypeContainer />
  </div>
)

