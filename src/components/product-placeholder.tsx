import React, { useEffect } from "react"
import { useState } from "react"
import { Row, Text } from "../styles/style"

export interface ProductPlaceholderProps {
  name: string
}

export const ProductPlaceholder = ({ name }: ProductPlaceholderProps) => {
  const [height, setHeight] = useState(0)

  let ref = null

  useEffect(() => setHeight(ref.clientWidth * 1.33))

  return (
    <Row
      ref={node => (ref = node)}
      backgroundColor={"#F44336"}
      shadow
      justifyCenter
      alignCenter
      padding="8px"
      fillWidth
      stretch
      pointer
      minHeight={height}
    >
      <Text pointer color={"white"} center>
        {name}
      </Text>
    </Row>
  )
}
