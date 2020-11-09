import { faTimes } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import styled from "styled-components"
import { Column, Overlay, Panel, Row } from "../styles/style"
import { theme } from "../styles/theme"
import { IconButton } from "./icon-button"

export interface BottomSliderProps {
  show: boolean
  onClose?(e: any): void
  onClickOutside?(e: any): void
  children: any
}

export const BottomSlider = ({
  show,
  onClose = null,
  onClickOutside = null,
  children,
}: BottomSliderProps) => {
  return (
    <>
      <Pane show={show}>
        <Column stretch className="bottompane">
          <Row justifyEnd fillWidth>
            <IconButton
              color={theme.brandColor}
              onClick={onClose}
              icon={faTimes}
            />
          </Row>
          {children}
        </Column>
      </Pane>
      {show && <Overlay onClick={onClickOutside} />}
    </>
  )
}

const Pane = styled<any>(Panel)`
  flex-direction: column;
  transition: height 0.225s;
  position: fixed;
  width: 100vw;
  z-index: ${theme.overlayZIndex + 1};
  bottom: 0;
  background-color: white;
  height: ${props => (props.show ? "316px" : "0")};
  .bottompane {
    width: 100vw;
    height: 100%;
  }
`
