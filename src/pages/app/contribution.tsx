import { faHome } from "@fortawesome/free-solid-svg-icons"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { StringParam, useQueryParam } from "use-query-params"
import { fetchCategories } from "../../components/gallery-page"
import Layout from "../../components/layout"
import { Badge } from "../../components/product"
import { ProductPhoto } from "../../components/product-photo"
import SEO from "../../components/seo"
import { Book, categoryListState } from "../../states/state"
import { Column, Icon, Panel, Row, Text } from "../../styles/style"
import { theme } from "../../styles/theme"
import { ContributionsPanel } from "../../components/contributions-panel"

export interface Contribution {
  amount: number
  remark: string
  image: string
}

export const ContributionPage = () => {
  const [orderId] = useQueryParam("orderId", StringParam)

  const [products, setProducts] = useState<Book[]>([])
  const [loc, setLoc] = useState("")
  const [categoryList, setCategoryList] = useRecoilState(categoryListState)

  const loadOrder = async () => {
    const db = firebase.firestore()
    const query = await db.collection("orders").doc(orderId).get()
    const order = query.data()
    setProducts(order.orders)
    setLoc(order.location)
    loadCategories(loc)
  }

  const loadCategories = async (loc: string) => {
    const categoryList = await fetchCategories(loc)
    setCategoryList(categoryList)
  }

  useEffect(() => {
    loadOrder()
  }, [orderId])

  const renderToolbar = () => (
    <Row alignCenter>
      <Row
        alignCenter
        pr={16}
        onClick={() => navigate(`/${loc.toLowerCase()}`)}
      >
        <Icon color={theme.brandColor} icon={faHome} />
        <Text ml={8} color={theme.brandColor}>
          Home
        </Text>
      </Row>
    </Row>
  )

  let total = 0

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
          const subtotal = o.quantity * o.price
          total += subtotal
          return (
            <Panel padding={"16px"} key={o.id} alignCenter>
              <Row fillWidth maxWidth={"30%"}>
                <ProductPhoto book={o} />
              </Row>
              <Column ml={16}>
                <Text mb={8} fontSize={"13px"}>
                  {o.name}
                </Text>
                {category && (
                  <Badge style={{ marginBottom: 8 }}>{category?.name}</Badge>
                )}
                <Text mb={8} color={theme.brandColor} fontSize={"14px"}>
                  RM{o.price} x {o.quantity}
                </Text>
                <Text
                  mb={8}
                  color={theme.brandColor}
                  fontSize={"14px"}
                  fontWeight={900}
                >
                  RM{subtotal}
                </Text>
              </Column>
            </Panel>
          )
        })}
        <Panel fillWidth padding="16px">
          <Column fillWidth>
            <Text
              color={theme.brandColor}
              fontSize={"14px"}
              fontWeight={900}
              mb={8}
            >
              Total: RM {total}
            </Text>
          </Column>
        </Panel>
        <ContributionsPanel orderId={orderId} />
      </Column>
    </Layout>
  )
}

export default ContributionPage
