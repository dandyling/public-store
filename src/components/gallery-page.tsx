import React, { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  Book,
  Category,
  categoryListState,
  categoryState,
  Location,
  locationState,
  locState,
  mainState,
  productsState,
  searchState,
} from "../states/state"
import { CategoryFilter } from "./category-filter"
import { CategoryProducts } from "./category-products"
import { SearchBox } from "./header"
import Layout, { CopyrightFooter } from "./layout"
import SEO from "./seo"
import firebase from "gatsby-plugin-firebase"
import { includeIdToData } from "../pages/app/place-order"

export interface GalleryPageProps {
  data: any
  loc: string
}

export interface ProductsBackup {
  loc: string
  products: Book[]
}

export const isServer = typeof window === "undefined"

export const isLocationChanged = (loc: string) =>
  JSON.parse(localStorage.getItem("products"))?.loc !== loc

export const backupProducts = (backup: ProductsBackup) =>
  localStorage.setItem("products", JSON.stringify(backup))

export const backupLocation = (loc: string) => localStorage.setItem("loc", loc)

export const GalleryPage = ({ data, loc }: GalleryPageProps) => {
  const [category, setCategory] = useRecoilState(categoryState)
  const [search, setSearch] = useRecoilState(searchState)
  const setMain = useSetRecoilState(mainState)
  const setCategoryList = useSetRecoilState(categoryListState)
  const setLocations = useSetRecoilState(locationState)
  const setLoc = useSetRecoilState(locState)
  const setProducts = useSetRecoilState(productsState)
  setLoc(loc)
  !isServer && backupLocation(loc)
  if (!isServer && isLocationChanged(loc)) {
    const newProducts = []
    setProducts(newProducts)
    const backup: ProductsBackup = {
      loc,
      products: newProducts,
    }
    backupProducts(backup)
  }

  const loadCategories = async () => {
    const categoryList = await fetchCategories(loc)
    setCategoryList(categoryList)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const filterCategory = e => e.node.category === category

  const filterName = e =>
    e.node.name.toLowerCase().includes(search.toLowerCase())

  const getCategories = (): Category[] => {
    const { edges: edgesCategory } = data.allCategory
    const categories: Category[] = edgesCategory.map(e => {
      return {
        ...e.node,
        onClick: () => {
          setCategory(e.node.id)
          setSearch("")
        },
      }
    })
    categories.push({
      id: "ALL",
      name: "All Categories",
      location: loc,
      onClick: () => {
        setCategory("ALL")
        setSearch("")
      },
    })
    return categories
  }

  const getBooks = (): Book[] => {
    const { edges: edgesBook } = data.allBook
    const hasSearchFilter = search !== ""
    const hasCategoryFilter = category !== "ALL"
    const filter = hasSearchFilter ? filterName : filterCategory
    const filteredEdgesBook =
      hasSearchFilter || hasCategoryFilter
        ? edgesBook.filter(filter)
        : edgesBook
    const books: Book[] = filteredEdgesBook.map(b => b.node)
    return books
  }

  const getLibrary = (): Record<string, Book[]> => {
    const initialLibrary = books.reduce((allBooks, b) => {
      allBooks[b.category] = []
      return allBooks
    }, {})
    const library = books.reduce((allBooks, b) => {
      allBooks[b.category].push(b)
      return allBooks
    }, initialLibrary)
    return library
  }

  const getLocations = (): Location[] => data.allLocation.edges.map(e => e.node)

  const categories = getCategories()
  const books = getBooks()
  const library = getLibrary()
  const locations = getLocations()
  setLocations(locations)

  const renderSearchBox = () => (
    <SearchBox
      value={search}
      placeholder={"Search here"}
      onChange={e => setSearch(e.currentTarget.value)}
    />
  )

  return (
    <Layout onRef={node => setMain(node)} renderToolbar={renderSearchBox}>
      <SEO title="Training Institute Materials" />
      <CategoryFilter categories={categories} />
      <CategoryProducts categories={categories} library={library} />
      <CopyrightFooter />
    </Layout>
  )
}

export const fetchCategories = async (loc: string) => {
  const db = firebase.firestore()
  const query = await db
    .collection("categories")
    .where("location", "==", loc)
    .get()
  const categoryList = query.docs.map(includeIdToData)
  return categoryList
}

export default GalleryPage
