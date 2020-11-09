export interface Theme {
  brandColor: string
  backgroundColor: string
  buttonBackgroundColor: string
  primaryTextColor: string
  fontFamily: string
  defaultFontSize: string
  headerHeight: string
  secondaryHeaderHeight: string
  footerHeight: string
  overlayZIndex: number
  boxShadow: string
  border: string
}

export const theme: Theme = {
  brandColor: `#e91e63`,
  backgroundColor: `rgba(0, 0, 0, 0.05)`,
  buttonBackgroundColor: `rgba(0, 0, 0, 0.26)`,
  primaryTextColor: `rgba(0, 0, 0, 0.87)`,
  fontFamily: `-apple-system, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Roboto, Droid Sans, Arial, sans-serif`,
  defaultFontSize: `14px`,
  headerHeight: `56px`,
  secondaryHeaderHeight: `46px`,
  footerHeight: `48px`,
  overlayZIndex: 9000,
  boxShadow: `1px 1px 4px 0 rgba(0, 0, 0, 0.06)`,
  border: `0.5px solid rgba(0, 0, 0, 0.26)`,
}
