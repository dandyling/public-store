import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { navigate } from "gatsby"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { backupProducts, ProductsBackup } from "../../components/gallery-page"
import Layout from "../../components/layout"
import { NumericInput } from "../../components/numeric-input"
import { Badge } from "../../components/product"
import { ProductPhoto } from "../../components/product-photo"
import SEO from "../../components/seo"
import { Button, Column, Icon, Panel, Row, Text } from "../../styles/style"
import { theme } from "../../styles/theme"
import { BottomPanel, goBack } from "../../templates/product-details"
import {
  Book,
  categoryListState,
  clone,
  locState,
  productsState,
  productsTotalState,
} from "./../../states/state"

export interface ShoppingCartPageProps {
  path?: string
}

export const ShoppingCartPage = (props: ShoppingCartPageProps) => {
  const [products, setProducts] = useRecoilState(productsState)
  const orderTotal = useRecoilValue(productsTotalState)
  const categoryList = useRecoilValue(categoryListState)
  const loc = useRecoilValue(locState)

  const removeProduct = (i: number): void => {
    const newProducts = [...products.slice(0, i), ...products.slice(i + 1)]
    setProducts(newProducts)
  }

  const backup = (newProducts: Book[]) => {
    const backup: ProductsBackup = {
      loc,
      products: newProducts,
    }
    backupProducts(backup)
  }

  const renderToolbar = () => (
    <Row alignCenter>
      <Row pr={16} onClick={goBack}>
        <Icon color={theme.brandColor} icon={faArrowLeft} />
      </Row>
      <Text color={theme.primaryTextColor} fontSize={theme.defaultFontSize}>
        Order Cart
      </Text>
    </Row>
  )

  const handleIncrement = (i: number) => {
    const newProducts = clone(products)
    newProducts[i].quantity = newProducts[i].quantity + 1
    setProducts(newProducts)
    backup(newProducts)
  }

  const handleDecrement = (i: number) => {
    const newProducts = clone(products)
    if (newProducts[i].quantity === 1) {
      const yes = confirm(
        "Do you want to remove this product from your order cart?"
      )
      if (yes) {
        removeProduct(i)
      }
    } else {
      newProducts[i].quantity = newProducts[i].quantity - 1
      setProducts(newProducts)
    }
    backup(newProducts)
  }

  return (
    <Layout
      headerHeight={theme.secondaryHeaderHeight}
      renderToolbar={renderToolbar}
    >
      <SEO title="Training Institute Materials" />
      <Column
        my={2}
        maxHeight={`calc(100% - ${theme.footerHeight} - 4px)`}
        scrollY
      >
        {products.map((o, i) => {
          const category = categoryList.find(c => c.id === o.category)
          return (
            <Panel padding={"16px"} key={o.id} alignCenter>
              <Row fillWidth maxWidth={"30%"}>
                <ProductPhoto book={o} />
              </Row>
              <Column ml={16}>
                <Text mb={8} fontSize={"13px"}>
                  {o.name}
                </Text>
                <Badge style={{ marginBottom: 8 }}>{category?.name}</Badge>
                <Text mb={8} color={theme.brandColor} fontSize={"14px"}>
                  RM{o.price}
                </Text>
                <NumericInput
                  onIncrement={() => handleIncrement(i)}
                  onDecrement={() => handleDecrement(i)}
                  count={products[i].quantity}
                  min={0}
                  max={99}
                />
              </Column>
            </Panel>
          )
        })}
      </Column>
      <BottomPanel>
        <Row alignCenter fillWidth justifyEnd>
          <Text color={theme.brandColor} fontSize={"16px"}>
            RM{orderTotal}
          </Text>
          <Button
            mx={16}
            width={100}
            borderRadius={2}
            padding={"4px"}
            pointer
            onClick={() => navigate("/app/place-order")}
          >
            Place Order
          </Button>
        </Row>
      </BottomPanel>
    </Layout>
  )
}

export default ShoppingCartPage
