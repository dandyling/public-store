import React from "react"
import { Category } from "../states/state"
import { Row, Text } from "../styles/style"

export const colorRoulette = [
  "rgb(134 175 215)",
  "rgb(118 201 189)",
  "rgb(136, 207, 129)",
]
export interface CategoryPanelProps {
  categories: Category[]
}

export const CategoryPanel = ({ categories }: CategoryPanelProps) => {
  return (
    <Row className="category-panel" scrollX>
      {categories
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((c, i) => {
          return (
            <Row
              mx={16}
              my={8}
              px={8}
              key={c.id}
              minWidth={108}
              maxWidth={108}
              height={40}
              justifyCenter
              alignCenter
              backgroundColor={colorRoulette[i % 3]}
              borderRadius={4}
              pointer
              onClick={c.onClick}
            >
              <Text pointer center color={"white"}>
                {c.name}
              </Text>
            </Row>
          )
        })}
    </Row>
  )
}
