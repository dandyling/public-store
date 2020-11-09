import React from "react"
import styled from "styled-components"
import { Row, Text } from "../styles/style"
import { theme } from "../styles/theme"

export interface RowSelectProps {
  label: string
  placeholder?: string
  value: string
  onChange(e: any): void
  selections: string[]
}

export const RowSelect = ({
  label,
  placeholder,
  value,
  onChange,
  selections,
}: RowSelectProps) => {
  return (
    <Row fillWidth height={45} px={12} justifySpaceBetween alignCenter>
      <Text>{label}</Text>
      <Select onChange={onChange} placeholder={placeholder} value={value}>
        {selections.map(s => (
          <Option key={s}>{s}</Option>
        ))}
      </Select>
    </Row>
  )
}

export const Select = styled.select`
  border: none;
  font-family: ${theme.fontFamily};
  font-size: ${theme.defaultFontSize};
  background-color: white;
  text-align-last: right;
`

export const Option = styled.option`
  font-family: ${theme.fontFamily};
  font-size: ${theme.defaultFontSize};
  background-color: white;
  text-align: right;
  direction: rtl;
`
