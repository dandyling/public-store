import React, { ReactNode } from "react"
import { theme } from "../styles/theme"
import styled from "styled-components"
import { isPx, Row } from "../styles/style"

export interface HeaderProps {
  renderToolbar(): ReactNode
  height?: number | string
}

const Header = ({ renderToolbar, height }: HeaderProps) => (
  <AppBar height={height}>
    <Row margin={"0 12px"} fillWidth>
      {renderToolbar && renderToolbar()}
    </Row>
  </AppBar>
)

export interface AppBarProps {
  height?: number | string
}

export const AppBar = styled.header<AppBarProps>`
  display: flex;
  align-items: center;
  height: ${props => (props.height ? isPx(props.height) : theme.headerHeight)};
  position: fixed;
  width: 100%;
  box-shadow: ${theme.boxShadow};
`

export const SearchBox = styled.input`
  appearance: none;
  background-color: ${theme.backgroundColor};
  border-color: ${theme.primaryTextColor};
  border-radius: 4px;
  border-width: 0px;
  color: ${theme.brandColor};
  cursor: text;
  font-family: ${theme.fontFamily};
  font-size: ${theme.defaultFontSize};
  font-weight: 300px;
  height: 36px;
  outline-color: ${theme.primaryTextColor};
  padding-left: 8px;
  outline: none;
  width: 100%;
  box-shadow: ${theme.boxShadow};
`

export default Header
