import React from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import { toastState } from "../states/state"
import { Row, Text } from "./../styles/style"

export const Toast = () => {
  const [toast, setToast] = useRecoilState(toastState)

  if (toast) {
    setTimeout(() => {
      setToast(null)
    }, 2000)
  }

  if (!toast) {
    return null
  }
  return (
    <Container>
      <Row
        padding="16px"
        borderRadius={3}
        backgroundColor={"rgba(0, 0, 0, 0.5)"}
      >
        <Text color={"white"}>{toast}</Text>
      </Row>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
