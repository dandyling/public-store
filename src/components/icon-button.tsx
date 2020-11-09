import React from "react"
import { Icon, IconProps, Row } from "../styles/style"

export interface IconButtonProps extends IconProps {
  onClick(e: any)
  icon: any
}

export const IconButton = ({ onClick, icon, ...rest }: IconButtonProps) => {
  return (
    <Row pointer padding={"10px"} onClick={onClick}>
      <Icon fontSize={20} icon={icon} {...rest} />
    </Row>
  )
}
