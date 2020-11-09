import React from "react"
import styled from "styled-components"
import { Category } from "../states/state"
import { Row } from "../styles/style"
import { Option, Select } from "./row-select"

export interface CategoryDropdownProps {
  categories: Category[]
  value: string
}

export const CategoryDropdown = ({
  categories,
  value,
}: CategoryDropdownProps) => {
  const handleChange = e => {
    const category = categories.find(c => c.id === e.currentTarget.value)
    category.onClick(e)
  }

  return (
    <Row
      className="category-dropdown"
      backgroundColor="white"
      padding="0 12px 8px 12px"
      fillWidth
    >
      <FullSelect
        onChange={handleChange}
        placeholder="Choose Category"
        value={value}
      >
        {categories
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(c => {
            return (
              <FullOption key={c.id} value={c.id}>
                {c.name}
              </FullOption>
            )
          })}
      </FullSelect>
    </Row>
  )
}

const FullSelect = styled(Select)`
  width: 100%;
  text-align-last: left;
`

const FullOption = styled(Option)`
  direction: ltr;
`
