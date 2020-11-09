import { navigate } from "gatsby"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { Button, Column, Row, Text } from "../styles/style"
import { theme } from "../styles/theme"
import {
  Book,
  categoryListState,
  clone,
  locState,
  productsState,
  showSliderState,
  sliderProductState,
} from "./../states/state"
import { BottomSlider } from "./bottom-slider"
import { backupProducts, ProductsBackup } from "./gallery-page"
import { NumericInput } from "./numeric-input"
import { Badge } from "./product"
import { ProductPhoto } from "./product-photo"

export interface PurchaseSlidderProps {
  navigateNext: boolean
}

export const PurchaseSlidder = ({ navigateNext }: PurchaseSlidderProps) => {
  const [showSlider, setShowSlider] = useRecoilState(showSliderState)
  const [sliderProduct, setSliderProduct] = useRecoilState(sliderProductState)
  const [products, setProducts] = useRecoilState(productsState)
  const categoryList = useRecoilValue(categoryListState)
  const loc = useRecoilValue(locState)

  const handleCloseSlider = () => setShowSlider(false)

  const handleOrderNow = () => {
    const newProducts: Book[] = clone(products)
    const product = newProducts.find(p => p.id === sliderProduct.id)
    if (product) {
      product.quantity += sliderProduct.quantity
    } else {
      newProducts.push(sliderProduct)
    }
    setProducts(newProducts)
    const backup: ProductsBackup = {
      loc,
      products: newProducts,
    }
    backupProducts(backup)
    setShowSlider(false)
    navigateNext && navigate("/app/shopping-cart")
  }

  if (!sliderProduct) {
    return null
  }

  const handleIncrement = () => {
    const newProduct = clone(sliderProduct)
    newProduct.quantity = newProduct.quantity + 1
    setSliderProduct(newProduct)
  }

  const handleDecrement = () => {
    if (sliderProduct.quantity > 1) {
      const newProduct = clone(sliderProduct)
      newProduct.quantity = newProduct.quantity - 1
      setSliderProduct(newProduct)
    }
  }

  const category = categoryList.find(c => c.id === sliderProduct.category)

  return (
    <BottomSlider
      show={showSlider}
      onClose={handleCloseSlider}
      onClickOutside={handleCloseSlider}
    >
      <Column justifySpaceBetween fillWidth fillHeight padding={"16px"}>
        <Row fillWidth justifyCenter alignCenter>
          <Row width={100} mx={16}>
            <ProductPhoto book={sliderProduct} />
          </Row>
          <Column>
            <Text mb={8} fontSize={"18px"}>
              {sliderProduct.name}
            </Text>
            <Badge style={{ marginBottom: 8 }}>{category?.name}</Badge>
            <Text fontSize={"16px"}>RM{sliderProduct.price}</Text>
          </Column>
        </Row>
        <Row mb={16} alignCenter justifySpaceBetween fillWidth>
          <Text color={theme.primaryTextColor}>Quantity</Text>
          <Row padding="0 8px">
            <NumericInput
              count={sliderProduct.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              min={1}
              max={99}
            />
          </Row>
        </Row>
        <Button
          pointer
          borderRadius={2}
          padding={"8px"}
          onClick={handleOrderNow}
          fillWidth
        >
          Order Now
        </Button>
      </Column>
    </BottomSlider>
  )
}
