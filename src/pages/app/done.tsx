import React from "react"
import { Row, Text, Link, Panel, Column } from "./../../styles/style"
import { useRecoilValue } from "recoil"
import { locState } from "../../states/state"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { theme } from "../../styles/theme"
import { navigate } from "gatsby"

export const DonePage = () => {
  const loc = useRecoilValue(locState)

  return (
    <Layout>
      <SEO title="Order Placed" />
      <Panel justifyCenter alignCenter>
        <Column alignCenter justifyCenter my={32} mx={16}>
          <Text center mb={64}>
            Your order has been placed. Please wait for 2 weeks for your order
            to be delivered
          </Text>
          <Text
            onClick={() => navigate(`/${loc.toLowerCase()}`)}
            center
            fontWeight={900}
            color={theme.brandColor}
            pointer
          >
            Go back to Home
          </Text>
        </Column>
      </Panel>
    </Layout>
  )
}

export default DonePage
