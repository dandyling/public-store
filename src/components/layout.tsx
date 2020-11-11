import React, { ReactNode, useEffect } from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { isLoadingState, mainState, scrollState } from "../states/state"
import { Column, isPx, Text } from "../styles/style"
import { theme } from "../styles/theme"
import Header from "./header"
import "./layout.css"
import Spinner from "./spinner"
import { Toast } from "./toast"

export interface LayoutProps {
  children: ReactNode
  headerHeight?: number | string
  renderToolbar?(): ReactNode
  onRef?(node: any): void
}

const Layout = ({
  children,
  headerHeight,
  renderToolbar,
  onRef,
}: LayoutProps) => {
  const isLoading = useRecoilValue(isLoadingState)
  const main = useRecoilValue(mainState)
  const scroll = useRecoilValue(scrollState)

  useEffect(() => {
    if (scroll && main) {
      main.scrollTop = scroll
    }
  }, [scroll, main])

  return (
    <Column minHeight="100vh">
      <Header height={headerHeight} renderToolbar={renderToolbar} />
      <Main ref={onRef} headerHeight={headerHeight}>
        <Spinner isLoading={isLoading} />
        {children}
      </Main>
      <Toast />
    </Column>
  )
}

export const CopyrightFooter = () => (
  <Footer>
    <Column alignCenter>
      <Text style={{ fontStyle: "italic" }} mt={8} mb={8}>
        The images shown are for illustration purpose only
      </Text>
      ©{new Date().getFullYear()}, Training Institute Board
    </Column>
  </Footer>
)

export interface MainProps {
  headerHeight?: number | string
}

export const Main = styled.main<MainProps>`
  background-color: ${theme.backgroundColor};
  position: fixed;
  top: ${props =>
    props.headerHeight ? isPx(props.headerHeight) : theme.headerHeight};
  height: calc(
    100% -
      ${props =>
        props.headerHeight ? isPx(props.headerHeight) : theme.headerHeight}
  );
  overflow-y: scroll;
  width: 100%;
`

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 8px;
  font-family: ${theme.fontFamily};
  font-size: ${theme.defaultFontSize};
`

export default Layout
