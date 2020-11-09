import React from "react"
import { FlexProps, Row } from "../styles/style"
import { ProductPlaceholder } from "./product-placeholder"
import { ProductProps } from "./product"
import styled from "styled-components"
import { theme } from "../styles/theme"

export const ProductPhoto = ({ book }: ProductProps) => {
  return (
    <Row justifyCenter fillWidth alignCenter stretch maxWidth="200px">
      {book.image ? (
        <Photo src={book.image} />
      ) : (
        <ProductPlaceholder name={book.name} />
      )}
    </Row>
  )
}

export const Photo = styled.img<FlexProps>`
  box-shadow: ${theme.boxShadow};
  margin-bottom: 0px;
`
