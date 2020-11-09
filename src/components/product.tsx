import React from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { Column, Row } from "../styles/style"
import { theme } from "../styles/theme"
import { Book, categoryListState } from "./../states/state"
import { ProductPhoto } from "./product-photo"

export interface ProductProps {
  book: Book
  className?: string
}

export const Product = ({ book, className }: ProductProps) => {
  const categoryList = useRecoilValue(categoryListState)
  const category = categoryList.find(c => c.id === book.category)
  return (
    <Panel className={className}>
      <ProductPhoto book={book} />
      <Column fillWidth>
        <Description className="product-description">{book.name}</Description>
        {category && <Badge>{category?.name}</Badge>}
        <Row>
          <Currency className="product-currency">RM</Currency>
          <Price className="product-price">{book.price.toFixed(2)}</Price>
        </Row>
      </Column>
    </Panel>
  )
}

export const Badge = styled(Row)`
  color: ${theme.brandColor};
  border-radius: 1px;
  border: 1px solid ${theme.brandColor};
  font-family: ${theme.fontFamily};
  font-size: 10px;
  height: 16px;
  line-height: 14px;
  padding: 0 4px 0 4px;
  margin-bottom: 4px;
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  font-size: ${theme.defaultFontSize};
  font-family: ${theme.fontFamily};
  box-shadow: ${theme.boxShadow};
`

const Description = styled.p`
  user-select: none;
  line-height: 17px;
  margin-bottom: 2px;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Currency = styled.span`
  color: ${theme.brandColor};
  font-size: 12px;
  user-select: none;
  align-self: baseline;
`

const Price = styled.span`
  color: ${theme.brandColor};
  font-size: 16px;
  user-select: none;
`
