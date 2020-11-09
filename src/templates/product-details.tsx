import {
  faArrowLeft,
  faCartPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons"
import { navigate } from "@reach/router"
import { graphql } from "gatsby"
import React, { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"
import { Badge } from "../components/badge"
import { CircleButton } from "../components/circle-button"
import Layout from "../components/layout"
import { Product } from "../components/product"
import { PurchaseSlidder } from "../components/purchase-slidder"
import { Button, Icon, Panel, Row, Text } from "../styles/style"
import { theme } from "../styles/theme"
import {
  productsCountState,
  showSliderState,
  sliderProductState,
} from "./../states/state"

export const goBack = () => window.history.back()

export const ProductDetails = ({ data }) => {
  const book = data.book

  const [isNext, setIsNext] = useState(true)

  const setShowSlider = useSetRecoilState(showSliderState)
  const setSliderProduct = useSetRecoilState(sliderProductState)
  const totalQuantity = useRecoilValue(productsCountState)

  const renderToolbar = () => (
    <Row fillWidth justifySpaceBetween>
      <CircleButton pointer icon={faArrowLeft} onClick={goBack} />
      <Row relative justifyCenter alignCenter>
        <CircleButton
          pointer
          icon={faShoppingCart}
          onClick={() => navigate("/app/shopping-cart")}
        />
        {totalQuantity > 0 && (
          <Badge
            absolute
            positionBottom={-3}
            positionRight={-3}
            size={15}
            count={totalQuantity}
          />
        )}
      </Row>
    </Row>
  )

  const handleAddToCart = () => {
    setIsNext(false)
    setOrder()
  }

  const setOrder = () => {
    setShowSlider(true)
    const newBook = { ...book }
    newBook.quantity = 1
    setSliderProduct(newBook)
  }

  return (
    <Layout renderToolbar={renderToolbar}>
      <Row backgroundColor="white" alignCenter justifyCenter fillWidth>
        <LargeProduct book={book} />
      </Row>
      <BottomPanel>
        <Button pointer onClick={handleAddToCart} flex={1} fillHeight>
          <Row justifyCenter alignCenter>
            <Icon icon={faCartPlus} fontSize={20} color={"white"} />
            <Text ml={8} color={"white"}>
              Add to Order Cart
            </Text>
          </Row>
        </Button>
      </BottomPanel>
      <PurchaseSlidder navigateNext={isNext} />
    </Layout>
  )
}

export const LargeProduct = styled(Product)`
  width: 80vmin;
  .product-description {
    font-size: 16px;
    margin-top: 16px;
  }
  .product-currency,
  .product-price {
    font-weight: 500;
    font-size: 16px;
  }
  box-shadow: none;
`

export const BottomPanel = styled(Panel)`
  position: fixed;
  bottom: 0px;
  height: ${theme.footerHeight};
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily};
  font-size: ${theme.defaultFontSize};
`

export const query = graphql`
  query($slug: String!) {
    book(fields: { slug: { eq: $slug } }) {
      id
      name
      image
      price
      location
      category
    }
  }
`

export default ProductDetails
