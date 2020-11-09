import styled from "styled-components"
import { Link as SLink } from "gatsby"
import { theme } from "./theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export interface FlexProps {
  fillWidth?: boolean
  fillHeight?: boolean
  height?: string | number
  minHeight?: string | number
  maxHeight?: string | number
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  row?: boolean
  column?: boolean
  justified?: boolean
  justifyCenter?: boolean
  justifyEnd?: boolean
  justifySpaceBetween?: boolean
  justifySpaceAround?: boolean
  alignStart?: boolean
  alignCenter?: boolean
  alignEnd?: boolean
  border?: string
  borderLeft?: string
  borderRight?: string
  borderTop?: string
  borderBottom?: string
  borderRadius?: number | string
  scrollX?: boolean
  scrollY?: boolean
  backgroundColor?: string
  margin?: string
  padding?: string
  mt?: number | string
  mr?: number | string
  mb?: number | string
  ml?: number | string
  mx?: number | string
  my?: number | string
  pt?: number | string
  pr?: number | string
  pb?: number | string
  pl?: number | string
  px?: number | string
  py?: number | string
  relative?: boolean
  fixed?: boolean
  absolute?: boolean
  sticky?: boolean
  static?: boolean
  positionTop?: number
  positionRight?: number
  positionBottom?: number
  positionLeft?: number
  pointer?: boolean
  stretch?: boolean
  flex?: number
  shadow?: boolean
}

export const getJustifiedProps = (props: FlexProps) => {
  if (props.justifySpaceBetween) return "space-between"
  else if (props.justifyCenter) return "center"
  else if (props.justifyEnd) return "flex-end"
  else if (props.justifySpaceAround) return "space-around"
  else return "flex-start"
}

export const getAlignedProps = (props: FlexProps) => {
  if (props.alignEnd) return "flex-end"
  else if (props.alignCenter) return "center"
  else return "flex-start"
}

export const getDimensions = props => {
  let style = ""
  if (props.fillWidth) style += "width: 100%;"
  if (props.fillHeight) style += "height: 100%;"
  return style
}

export const getMarginProps = (props: FlexProps) => `
  margin: ${props.margin};
  margin-top: ${props.mt}px;  
  margin-right: ${props.mr}px;
  margin-bottom: ${props.mb}px;
  margin-left: ${props.ml}px;
  ${props.mx ? `margin-left: ${props.mx}px; margin-right: ${props.mx}px;` : ""}
  ${props.my ? `margin-top: ${props.my}px; margin-bottom: ${props.my}px;` : ""}
`

export const getPaddingProps = (props: FlexProps) => `
  padding: ${props.padding};
  padding-top: ${props.pt}px;
  padding-right: ${props.pr}px;
  padding-bottom: ${props.pb}px;
  padding-left: ${props.pl}px;
  ${
    props.px ? `padding-left: ${props.px}px; padding-right: ${props.px}px;` : ""
  }
  ${
    props.py ? `padding-top: ${props.py}px; padding-bottom: ${props.py}px;` : ""
  }
`

export const getPositionProps = (props: FlexProps) =>
  `top: ${props.positionTop}px;
  right: ${props.positionRight}px;
  bottom: ${props.positionBottom}px;
  left: ${props.positionLeft}px;
  ${props.relative ? "position: relative;" : ""}
  ${props.fixed ? "position: fixed;" : ""}
  ${props.absolute ? "position: absolute;" : ""}
  ${props.sticky ? "position: sticky;" : ""}
  ${props.static ? "position: static;" : ""}
`

export const getBorders = props => {
  let style = ""
  if (props.border) style += `border: ${props.border};`
  if (props.borderLeft) style += `border-left: ${props.borderLeft};`
  if (props.borderRight) style += `border-right: ${props.borderRight};`
  if (props.borderTop) style += `border-top: ${props.borderTop};`
  if (props.borderBottom) style += `border-bottom: ${props.borderBottom};`
  if (props.borderRadius) style += `border-radius: ${isPx(props.borderRadius)};`
  return style
}

export const isPx = value => (typeof value === "number" ? `${value}px` : value)

export const getContainerProps = props => `
  ${props.backgroundColor ? `background-color: ${props.backgroundColor};` : ""}
  ${props.shadow ? `box-shadow: ${theme.boxShadow};` : ""};
  ${props.scrollX ? `overflow-x: scroll;` : ""};
  ${props.scrollY ? `overflow-y: scroll;` : ""};
`

export const getUtil = props => `
  ${props.pointer ? "cursor: pointer" : "cursor: default"};
`

export const getMisc = props => `
  ${props.stretch ? "flex: 1" : ""};
`

export const Row = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  justify-content: ${getJustifiedProps};
  align-items: ${getAlignedProps};
  height: ${props => isPx(props.height)};
  min-height: ${props => isPx(props.minHeight)};
  max-height: ${props => isPx(props.maxHeight)};
  width: ${props => isPx(props.width)};
  min-width: ${props => isPx(props.minWidth)};
  max-width: ${props => isPx(props.maxWidth)};
  flex: ${props => props.flex};
  ${props => getContainerProps(props)}
  ${props => getDimensions(props)}
  ${props => getBorders(props)}
  ${props => getMarginProps(props)}
  ${props => getPaddingProps(props)}
  ${props => getPositionProps(props)}
  ${props => getUtil(props)}
  ${props => getMisc(props)}
`

export const Column = styled(Row)<FlexProps>`
  display: flex;
  flex-direction: column;
`

export const Panel = styled(Row)`
  background-color: white;
  box-shadow: ${theme.boxShadow};
  width: 100%;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: ${theme.overlayZIndex};
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`

export const Link = styled(SLink)`
  color: ${theme.primaryTextColor};
  text-decoration: none;
`

export interface IconProps {
  fontSize?: number
  color?: string
}

export const Icon = styled(FontAwesomeIcon)<IconProps>`
  font-size: ${props => props.fontSize || 20}px;
  color: ${props => props.color || "white"};
`

export const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 18px;
  font-family: ${theme.fontFamily}
  border-color: transparent;
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
`

export const getPlainInputProps = props => `
  :focus {
    outline: none;
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
      -webkit-transition-delay: 9999s;
      -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
  }
  border: none;
  background-color: transparent;
  border-color: transparent;
  outline: none;
  ${props.height ? `height: ${isPx(props.height)};` : ""}
  font-family: ${theme.fontFamily};
  ${getTextProps(props)};
`
export interface PlainInputProps extends TextProps {
  height?: string | number
}

export const PlainInput = styled.input<PlainInputProps>`
  ${props => getPlainInputProps(props)}
`

export const PlainTextArea = styled.textarea<PlainInputProps>`
  ${props => getPlainInputProps(props)}
`

export interface TextProps {
  color?: string
  fontSize?: string
  lineHeight?: number
  center?: boolean
  justify?: boolean
  left?: boolean
  right?: boolean
  fontWeight?: number
  mt?: number
  mr?: number
  mb?: number
  ml?: number
  pointer?: boolean
}

export const getTextAlignProps = (props: TextProps) => {
  if (props.center) return "text-align: center;"
  else if (props.left) return "text-align: left;"
  else if (props.right) return "text-align: right;"
  else if (props.justify) return "text-align: justify;"
}

export const getTextProps = props => `
  font-family: ${theme.fontFamily};
  font-size: ${props.fontSize || theme.defaultFontSize};
  font-weight: ${props.fontWeight || 400};
  color: ${props.color || theme.primaryTextColor};
  line-height: ${props.lineHeight || 1};
  ${getMarginProps(props)}
  ${getTextAlignProps(props)}
`

export const Text = styled.span<TextProps>`
  ${props => getTextProps(props)}
  ${props => getUtil(props)}
`

export interface ButtonProps extends FlexProps {
  variant?: "light"
}

export const Button = styled(Row)<ButtonProps>`
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.variant === "light" ? "white" : theme.brandColor};
  color: ${props => (props.variant === "light" ? theme.brandColor : "white")};
`
