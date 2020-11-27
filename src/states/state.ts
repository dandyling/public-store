import { atom, selector } from "recoil"
import { isServer } from "../components/gallery-page"

export interface Book {
  id: string
  name: string
  image: string
  price: number
  quantity?: number
  category: string
  fields?: Fields
  order?: number
}

export interface Category {
  name: string
  location: string
  id: string
  onClick?(e: any): void
}

export interface Fields {
  slug: string
}

export type PickupOptions = "Postal Delivery" | "Self Pickup"

export type Level = "Regional" | "Adjoining Group" | "Cluster"

export type Institution = "RBC" | "TIB"

export interface OrderDetails {
  level: Level
  institution: Institution
  adjoining_group: string
  cluster: string
  individual: string
  email: string
  address: string
  phoneNumber: string
  remarks: string
  pickupOptions: PickupOptions
}

export const createOrderDetails = (): OrderDetails => ({
  level: "Cluster",
  institution: "TIB",
  adjoining_group: "",
  cluster: "",
  individual: "",
  email: "",
  address: "",
  phoneNumber: "+60",
  remarks: "",
  pickupOptions: "Postal Delivery"
})

export interface Location {
  id: string
  contains: string[]
}

export const showSliderState = atom({ key: "showSliderState", default: false })

export const sliderProductState = atom<Book>({
  key: "sliderProductState",
  default: null,
})

export const productsState = atom<Book[]>({
  key: "productsState",
  default: !isServer ? JSON.parse(localStorage.getItem("products"))?.products ?? [] : [],
})

export const orderDetailsState = atom<OrderDetails>({
  key: "orderDetailsState",
  default: createOrderDetails(),
})

export const productsSubState = selector<number[]>({
  key: "productsSubState",
  get: ({ get }) => {
    const products = get(productsState)
    return products.map(p => p.price * p.quantity)
  },
})

export const productsTotalState = selector<number>({
  key: "productsTotalState",
  get: ({ get }) => {
    const productsSub = get(productsSubState)
    return productsSub.reduce((total, s) => {
      return (total += s)
    }, 0)
  },
})

export const productsCountState = selector<number>({
  key: "productsCountState",
  get: ({ get }) => {
    const products = get(productsState)
    return products.reduce((total, p) => {
      return (total += p.quantity)
    }, 0)
  },
})

export const locationState = atom<Location[]>({
  key: "locationState",
  default: [],
})

export const categoryListState = atom<Category[]>({
  key: "categoryListState",
  default: [],
})

export const categoryState = atom<string>({
  key: "categoryState",
  default: "ALL",
})

export const searchState = atom<string>({
  key: "searchState",
  default: "",
})

export const locState = atom<string>({
  key: "locState",
  default: !isServer ? localStorage.getItem("loc") ?? "" : "",
})

export const isLoadingState = atom<boolean>({
  key: "isLoadingState",
  default: false,
})

export const toastState = atom<string>({
  key: "toastState",
  default: null,
})

export const mainState = atom<any>({
  key: "mainState",
  default: null,
})

export const scrollState = atom<number>({
  key: "scrollState",
  default: 0,
})

export const clone = <T extends unknown>(obj: T): T => JSON.parse(JSON.stringify(obj))
