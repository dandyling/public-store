import React from "react"
import { PlainInput, PlainTextArea, Row, Text } from "../styles/style"

export interface RowInputProps {
  label: string
  placeholder?: string
  value: string
  onChange(e: any): void
  disabled?: boolean
}

export const RowInput = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
}: RowInputProps) => {
  return (
    <Row fillWidth height={45} px={12} justifySpaceBetween alignCenter>
      <Text>{label}</Text>
      <PlainInput
        right
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Row>
  )
}

export const RowTextArea = ({
  label,
  placeholder,
  value,
  onChange,
}: RowInputProps) => {
  const height = 45
  return (
    <Row fillWidth height={height} px={12} justifySpaceBetween alignCenter>
      <Text>{label}</Text>
      <PlainTextArea
        right
        rows={2}
        height={height}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Row>
  )
}
