import React from "react"
import { Router } from "@reach/router"
import Layout from "../../components/layout"
import { ShoppingCartPage } from "./shopping-cart"
import PlaceOrderPage from "./place-order"

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <ShoppingCartPage path="/shopping-cart" />
        <PlaceOrderPage path="/place-order" />
      </Router>
    </Layout>
  )
}

export default App
