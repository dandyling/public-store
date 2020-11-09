import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"
import { Book, Category, mainState, scrollState } from "../states/state"
import { Column, Link, Row, Text } from "../styles/style"
import { theme } from "../styles/theme"
import { Product } from "./product"

export interface CategoryProductsProps {
  categories: Category[]
  library: Record<string, Book[]>
}

export const CategoryProducts = ({
  categories,
  library,
}: CategoryProductsProps) => {
  const main = useRecoilValue(mainState)
  const setScroll = useSetRecoilState(scrollState)
  let emptyCount = 0

  const byOrder = (a, b) =>
    a.order > b.order ? 1 : a.order < b.order ? -1 : a.name > b.name ? 1 : -1

  const handleScrollPosition = () => setScroll(main.scrollTop)

  return (
    <Column>
      {categories.map(category => {
        const books = library[category.id]
        if (!books) {
          emptyCount = emptyCount + 1
          return null
        }
        return (
          <Column fillWidth key={category.id}>
            <Row fillWidth padding={"8px"} pt={16} justifyCenter>
              <Text fontWeight={700} color={theme.primaryTextColor} center>
                {category.name}
              </Text>
            </Row>
            <Grid>
              {books.sort(byOrder).map(b => {
                b.quantity = 0
                const path = `/${b.fields.slug}`
                return (
                  <Link onClick={handleScrollPosition} key={b.id} to={path}>
                    <Product book={b} />
                  </Link>
                )
              })}
            </Grid>
          </Column>
        )
      })}
      {emptyCount === categories.length && (
        <Row fillWidth my={72} stretch justifyCenter alignCenter>
          <Text>No stock images</Text>
        </Row>
      )}
    </Column>
  )
}

export const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  grid-gap: 6px;
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: 1140px) {
    grid-template-columns: repeat(8, 1fr);
  }
`
