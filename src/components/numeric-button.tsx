import React from "react"
import styled from "styled-components"
import { FlexProps, Icon, Row } from "../styles/style"
import { theme } from "../styles/theme"

export interface NumericButtonProps extends FlexProps {
  icon: any
  onClick(): void
}

export const NumericButton = ({
  icon,
  onClick,
  ...rest
}: NumericButtonProps) => {
  return (
    <Row
      justifyCenter
      alignCenter
      onClick={onClick}
      padding={"4px"}
      pointer
      {...rest}
    >
      <Icon fontSize={16} color={theme.brandColor} icon={icon} />
    </Row>
  )
}
