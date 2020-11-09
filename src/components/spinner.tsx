import React from "react"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import styled from "styled-components"
import { theme } from "../styles/theme"

export interface SpinnerProps {
  isLoading: boolean
}

export const Spinner = (props: SpinnerProps) => {
  const { isLoading } = props
  return isLoading ? (
    <Container>
      <Loader type="Oval" color={theme.brandColor} height={100} width={100} />
    </Container>
  ) : null
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: calc(100vh - ${theme.headerHeight} - ${theme.footerHeight});
  width: 100vw;
  background-color: rgb(255, 255, 255, 0.5);
`

export default Spinner
