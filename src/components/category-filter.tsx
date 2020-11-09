import React from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { Category, categoryState } from "../states/state"
import { Column } from "../styles/style"
import { CategoryDropdown } from "./category-dropdown"
import { CategoryPanel } from "./category-panel"

export interface CategoryFilterProps {
  categories: Category[]
}

export const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const category = useRecoilValue(categoryState)
  return (
    <FilterContainer>
      <CategoryPanel categories={categories} />
      <CategoryDropdown value={category} categories={categories} />
    </FilterContainer>
  )
}

const FilterContainer = styled(Column)`
  .category-panel {
    display: none;
  }
  .category-dropdown {
    display: flex;
  }
  @media only screen and (min-width: 768px) {
    .category-panel {
      display: flex;
    }
    .category-dropdown {
      display: none;
    }
  }
`
