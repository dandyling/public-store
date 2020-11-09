import React from "react"
import { theme } from "../styles/theme"
import { FlexProps, Row, Icon } from "../styles/style"

export interface CircleButtonProps extends FlexProps {
  icon: any
  onClick(e: any): void
}

export const CircleButton = ({ icon, onClick, ...rest }: CircleButtonProps) => {
  return (
    <Row
      borderRadius={15}
      height={"30px"}
      width={"30px"}
      backgroundColor={theme.buttonBackgroundColor}
      justifyCenter
      alignCenter
      onClick={onClick}
      shadow
      {...rest}
    >
      <Icon icon={icon} fontSize={20}></Icon>
    </Row>
  )
}
