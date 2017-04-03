// @flow
// JavaScript Style Objects (jso)
import { css, media } from './jss'

// TODO: Note web vs native properties
// TODO: Should web only props live in cso?

// -------------------------------------
// Configuration
export const sansRegularFontStack = '"AtlasGroteskRegular", "AtlasGrotesk-Regular", "Helvetica Neue", "HelveticaNeue", "Helvetica", sans-serif'
export const sansBoldFontStack = '"AtlasGroteskBold", "AtlasGrotesk-Bold", "Helvetica Neue", "HelveticaNeue", "Helvetica", sans-serif'
export const monoRegularFontStack = '"AtlasTypewriterRegular", "AtlasTypewriter-Regular", "Andale Mono", "Consolas", "Lucida Console", "Menlo", "Luxi Mono", monospace'

// Web specific
export const minBreak2 = '(min-width: 40em)'      // 2: 640  / 16 = 40em
export const minBreak3 = '(min-width: 60em)'      // 3: 960  / 16 = 60em
export const minBreak4 = '(min-width: 85em)'      // 4: 1360 / 16 = 85em
export const minBreak5 = '(min-width: 107.5em)'   // 5: 1720 / 16 = 107.5em
export const minBreak6 = '(min-width: 130em)'     // 6: 2080 / 16 = 130em
export const minBreak7 = '(min-width: 152.5em)'   // 7: 2440 / 16 = 152.5em

export const maxBreak2 = '(max-width: 39.9375em)' // 2: 639  / 16 = 39.9375em

export const ease = 'cubic-bezier(0.23, 1, 0.32, 1)'
export const easeInOutQuart = 'cubic-bezier(0.77, 0, 0.175, 1)'
export const easeInOutCubic = 'cubic-bezier(0.645, 0.045, 0.355, 1)'

// -------------------------------------
// Flex
// - [css-tricks flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
// - [react-native flex implementation](https://facebook.github.io/yoga/)

export const flex = { display: 'flex' }
export const inlineFlex = { display: 'inline-flex' }
export const flexColumn = { flexDirection: 'column' }
export const flexRow = { flexDirection: 'row' }
export const flexWrap = { flexWrap: 'wrap' }
export const flexNoWrap = { flexWrap: 'nowrap' }
export const justifyStart = { justifyContent: 'flex-start' }
export const justifyEnd = { justifyContent: 'flex-end' }
export const justifyCenter = { justifyContent: 'center' }
export const justifySpaceBetween = { justifyContent: 'space-between' }
export const justifySpaceAround = { justifyContent: 'space-around' }
export const itemsStart = { alignItems: 'flex-start' }
export const itemsEnd = { alignItems: 'flex-end' }
export const itemsCenter = { alignItems: 'center' }
export const itemsBaseline = { alignItems: 'baseline' }
export const itemsStretch = { alignItems: 'stretch' }
export const contentStart = { alignContent: 'flex-start' }
export const contentEnd = { alignContent: 'flex-end' }
export const contentCenter = { alignContent: 'center' }
export const contentBetween = { alignContent: 'space-between' }
export const contentAround = { alignContent: 'space-around' }
export const contentStretch = { alignContent: 'stretch' }
export const selfStart = { alignSelf: 'flex-start' }
export const selfEnd = { alignSelf: 'flex-end' }
export const selfCenter = { alignSelf: 'center' }
export const selfBaseline = { alignSelf: 'baseline' }
export const selfStretch = { alignSelf: 'stretch' }

// -------------------------------------
// Position
export const absolute = { position: 'absolute' }
export const relative = { position: 'relative' }
export const fixed = { position: 'fixed' }
export const flood = { top: 0, right: 0, bottom: 0, left: 0 }

export const zIndex0 = { zIndex: 0 }
export const zIndex1 = { zIndex: 1 }
export const zIndex2 = { zIndex: 2 }
export const zTools = { zIndex: 1070 }
export const zGrid = { zIndex: 3000 }

// -------------------------------------
// Layout
export const block = { display: 'block' }
export const inlineBlock = { display: 'inline-block' }
export const inline = { display: 'inline' }
export const displayNone = { display: 'none' }
export const visible = { visibility: 'visible' }
export const hidden = { visibility: 'hidden' }
export const fit = { maxWidth: '100%' }
export const w100 = { width: '100%' }
export const overflowVisible = { overflow: 'visible' }
export const overflowHidden = { overflow: 'hidden' }
export const overflowScroll = { overflow: 'scroll' }
export const overflowScrollWebY = { WebkitOverflowScrolling: 'touch', overflowX: 'hidden', overflowY: 'auto' }

// -------------------------------------
// Alignment
export const alignBaseline = { verticalAlign: 'baseline' }
export const alignTop = { verticalAlign: 'top' }
export const alignMiddle = { verticalAlign: 'middle' }
export const alignBottom = { verticalAlign: 'bottom' }

// -------------------------------------
// Paddings
export const p0 = { padding: 0 }
export const pt0 = { paddingTop: 0 }
export const pr0 = { paddingRight: 0 }
export const pb0 = { paddingBottom: 0 }
export const pl0 = { paddingLeft: 0 }
export const px0 = { ...pr0, ...pl0 }
export const py0 = { ...pt0, ...pb0 }

export const p10 = { padding: 10 }
export const pt10 = { paddingTop: 10 }
export const pr10 = { paddingRight: 10 }
export const pb10 = { paddingBottom: 10 }
export const pl10 = { paddingLeft: 10 }
export const px10 = { ...pr10, ...pl10 }
export const py10 = { ...pt10, ...pb10 }

export const p20 = { padding: 20 }
export const pt20 = { paddingTop: 20 }
export const pr20 = { paddingRight: 20 }
export const pb20 = { paddingBottom: 20 }
export const pl20 = { paddingLeft: 20 }
export const px20 = { ...pr20, ...pl20 }
export const py20 = { ...pt20, ...pb20 }

export const p40 = { padding: 40 }
export const pt40 = { paddingTop: 40 }
export const pr40 = { paddingRight: 40 }
export const pb40 = { paddingBottom: 40 }
export const pl40 = { paddingLeft: 40 }
export const px40 = { ...pr40, ...pl40 }
export const py40 = { ...pt40, ...pb40 }

// Web specific
export const wrapperPaddingX = css(
  px10,
  media(minBreak2, px20),
  media(minBreak4, px40),
)

// -------------------------------------
// Margins
export const m0 = { margin: 0 }
export const mt0 = { marginTop: 0 }
export const mr0 = { marginRight: 0 }
export const mb0 = { marginBottom: 0 }
export const ml0 = { marginLeft: 0 }
export const mx0 = { ...mr0, ...ml0 }
export const my0 = { ...mt0, ...mb0 }

export const m10 = { margin: 10 }
export const mt10 = { marginTop: 10 }
export const mr10 = { marginRight: 10 }
export const mb10 = { marginBottom: 10 }
export const ml10 = { marginLeft: 10 }
export const mx10 = { ...mr10, ...ml10 }
export const my10 = { ...mt10, ...mb10 }

export const m20 = { margin: 20 }
export const mt20 = { marginTop: 20 }
export const mr20 = { marginRight: 20 }
export const mb20 = { marginBottom: 20 }
export const ml20 = { marginLeft: 20 }
export const mx20 = { ...mr20, ...ml20 }
export const my20 = { ...mt20, ...mb20 }

export const m40 = { margin: 40 }
export const mt40 = { marginTop: 40 }
export const mr40 = { marginRight: 40 }
export const mb40 = { marginBottom: 40 }
export const ml40 = { marginLeft: 40 }
export const mx40 = { ...mr40, ...ml40 }
export const my40 = { ...mt40, ...mb40 }

export const mAuto = { margin: 'auto' }
export const mrAuto = { marginRight: 'auto' }
export const mlAuto = { marginLeft: 'auto' }
export const mxAuto = { ...mrAuto, ...mlAuto }

// -------------------------------------
// Typography
export const sansRegular = {
  fontFamily: sansRegularFontStack,
  fontStyle: 'normal',
  fontWeight: 400,
}

export const sansItalic = {
  fontFamily: sansRegularFontStack,
  fontStyle: 'italic',
  fontWeight: 400,
}

export const sansBold = {
  fontFamily: sansBoldFontStack,
  fontStyle: 'normal',
  fontWeight: 700,
}
export const sansBoldItalic = {
  fontFamily: sansBoldFontStack,
  fontStyle: 'italic',
  fontWeight: 700,
}

export const monoRegular = {
  fontFamily: monoRegularFontStack,
  fontStyle: 'normal',
  fontWeight: 400,
}

// TODO: Turn into base level text components (web)
export const sansRegularCSS = css(sansRegular)
export const sansItalicCSS = css(sansItalic)
export const sansBoldCSS = css(sansBold)
export const sansBoldItalicCSS = css(sansBoldItalic)
export const monoRegularCSS = css(monoRegular)

export const fontSize12 = { fontSize: 12 }
export const fontSize14 = { fontSize: 14 }
export const fontSize16 = { fontSize: 16 }
export const fontSize18 = { fontSize: 18 }
export const fontSize24 = { fontSize: 24 }

export const leftAlign = { textAlign: 'left' }
export const center = { textAlign: 'center' }
export const rightAlign = { textAlign: 'right' }
export const decorationNone = { textDecoration: 'none' }
export const uppercase = { textTransform: 'uppercase' }
export const lowercase = { textTransform: 'lowercase' }
export const nowrap = { whiteSpace: 'nowrap' }
export const breakWord = { wordWrap: 'break-word' }
export const ellipsis = { textOverflow: 'ellipsis' }

// -------------------------------------
// Colors, backgrounds, opacity & fills
export const colorBlack = { color: '#000' }
export const color5 = { color: '#535353' }
export const color6 = { color: '#666' }
export const color9 = { color: '#999' }
export const colorA = { color: '#aaa' }
export const colorWhite = { color: '#fff' }

export const bgcTransparent = { backgroundColor: 'transparent' }
export const bgcBlack = { backgroundColor: '#000' }
export const bgc4 = { backgroundColor: '#4d4d4d' }
export const bgc6 = { backgroundColor: '#666' }
export const bgc9 = { backgroundColor: '#999' }
export const bgcA = { backgroundColor: '#aaa' }
export const bgcE = { backgroundColor: '#eaeaea' }
export const bgcWhite = { backgroundColor: '#fff' }
export const bgcGreen = { backgroundColor: '#00d100' }

export const opacity0 = { opacity: 0 }
export const opacity1 = { opacity: 1 }

// -------------------------------------
// Borders & strokes
export const borderTop = { borderTop: '1px solid' }
export const borderBottom = { borderBottom: '1px solid' }
export const borderBlack = { border: '1px solid #000' }
export const borderWhite = { border: '1px solid #fff' }

// -------------------------------------
// Transforms
export const transformNone = { transform: 'none' }
export const rotate90 = { transform: 'rotate(90deg)' }

// -------------------------------------
// Transitions & animations

export const transitionBgColor = { transition: 'background-color 0.2s ease' }
export const transitionColor = { transition: 'color 0.2s ease' }
export const transitionOpacity = { transition: 'opacity 0.2s ease' }
export const transitionTransform = { transition: `transform 0.2s ${ease}` }

// -------------------------------------
// Utility
export const pointerNone = { pointerEvents: 'none' }
export const pointerAuto = { pointerEvents: 'auto' }
export const hide = { ...displayNone, ...hidden }
export const invisible = { ...absolute, ...hidden, ...opacity0 }
export const hitarea = {
  ...absolute,
  ...flood,
  ...zIndex2,
  content: '""',
  backgroundColor: 'rgba(0, 0, 0, 0)',
}

