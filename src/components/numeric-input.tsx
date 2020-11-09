import React from "react"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { NumericButton } from "./numeric-button"
import { Row } from "../styles/style"
import styled from "styled-components"
import { theme } from "../styles/theme"

export interface NumericInputProps {
  count: number
  onIncrement(): void
  onDecrement(): void
  min?: number
  max?: number
}

export const NumericInput = ({
  count,
  min,
  max = 9999,
  onIncrement,
  onDecrement,
}: NumericInputProps) => {
  return (
    <Row height="30px" border={theme.border}>
      <NumericButton
        borderRight={theme.border}
        width={"30px"}
        fillHeight
        onClick={onDecrement}
        icon={faMinus}
      />
      <Input value={count} type="number" min={min || 0} max={max} />
      <NumericButton
        borderLeft={theme.border}
        width={"30px"}
        fillHeight
        onClick={onIncrement}
        icon={faPlus}
      />
    </Row>
  )
}

const Input = styled.input`
  width: 50px;
  text-align: center;
  font-size: 20px;
  font-family: ${theme.fontFamily}
  background-color: transparent;
  border: none;
  outline: none;
  margin-bottom: 2px;
`
