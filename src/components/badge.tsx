import React from "react"
import { FlexProps, Row, Text } from "../styles/style"
import { theme } from "../styles/theme"

export interface BadgeProps extends FlexProps {
  count: number
  size?: number
}

export const Badge = ({ count, size = 15, ...rest }: BadgeProps) => {
  return (
    <Row
      width={size}
      height={size}
      borderRadius={"50%"}
      backgroundColor={theme.brandColor}
      justifyCenter
      alignCenter
      {...rest}
    >
      <Text fontSize={"10px"} color={"white"}>
        {count || 0}
      </Text>
    </Row>
  )
}
