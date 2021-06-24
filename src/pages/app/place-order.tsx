import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import React, { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { backupProducts } from "../../components/gallery-page"
import Layout from "../../components/layout"
import { RowInput, RowTextArea } from "../../components/row-input"
import { RowSelect } from "../../components/row-select"
import SEO from "../../components/seo"
import {
  Book,
  clone,
  isLoadingState,
  Level,
  Location,
  locationState,
  locState,
  OrderDetails,
  orderDetailsState,
  PickupOptions,
  productsState,
  Institution,
  toastState,
} from "../../states/state"
import { Button, Column, Icon, Panel, Row } from "../../styles/style"
import { theme } from "../../styles/theme"
import { goBack } from "../../templates/product-details"

export interface PlaceOrderPage {
  path?: string
}

const LevelSelections: Level[] = ["Regional", "Adjoining Group", "Cluster"]

const InstitutionSelections: Institution[] = ["RBC", "TIB"]

type Order = OrderDetails & {
  orders: Book[]
  location: string
  created: firebase.firestore.Timestamp
}

export interface Id {
  id: string
}

const renderToolbar = () => (
  <Row alignCenter>
    <Row pr={16} onClick={goBack}>
      <Icon color={theme.brandColor} icon={faArrowLeft} />
    </Row>
  </Row>
)

export const getAdjoiningGroups = (
  locations: (Location & Id)[],
  loc: string
): string[] => locations.find(l => l.id === loc)?.contains

export const getClusters = (
  locations: (Location & Id)[],
  adjGroup: string
): string[] => locations.find(l => l.id === adjGroup)?.contains

export const PlaceOrderPage = (props: PlaceOrderPage) => {
  const [orderDetails, setOrderDetails] = useRecoilState(orderDetailsState)
  const [products, setProducts] = useRecoilState(productsState)
  const orders = clone(products)
  orders.forEach(o => {
    delete o.image
  })
  const [locations, setLocations] = useRecoilState(locationState)
  const loc = useRecoilValue(locState)
  const setToast = useSetRecoilState(toastState)
  const setIsLoading = useSetRecoilState(isLoadingState)

  const loadLocations = async () => {
    const db = firebase.firestore()
    const query = await db.collection("locations").get()
    const locations = query.docs.map(includeIdToData)
    setLocations(locations)
    const adjoiningGroups = getAdjoiningGroups(locations, loc)
    const firstGroup = adjoiningGroups[0]
    const newDetails = clone(orderDetails)
    newDetails.adjoining_group = firstGroup
    const clusters = getClusters(locations, firstGroup)
    newDetails.cluster = clusters[0]
    setOrderDetails(newDetails)
  }

  useEffect(() => {
    loadLocations()
  }, [])

  const handleChange = (e: any, field: string) => {
    const newDetails = { ...orderDetails }
    newDetails[field] = e.currentTarget.value
    setOrderDetails(newDetails)
  }

  const handleAdjoiningChange = (e: any) => {
    const adjoiningGroup = e.currentTarget.value
    const clusters = getClusters(locations, adjoiningGroup)
    const firstCluster = clusters[0]
    const newDetails = { ...orderDetails }
    newDetails.adjoining_group = adjoiningGroup
    newDetails.cluster = firstCluster
    setOrderDetails(newDetails)
  }

  const handlePickupOptions = (e: any) => {
    const newDetails = { ...orderDetails }
    const pickupOptions: PickupOptions = e.currentTarget.value
    newDetails.address =
      pickupOptions === "Self Pickup" ? "Pickup at TIB Office" : ""
    newDetails.pickupOptions = pickupOptions
    setOrderDetails(newDetails)
  }

  const validateInputs = () => {
    let pass = false
    if (!orderDetails.individual) {
      setToast("Please provide Full Name")
    } else if (
      !orderDetails.phoneNumber ||
      orderDetails.phoneNumber === "+60"
    ) {
      setToast("Please provide Phone Number")
    } else if (!orderDetails.email) {
      setToast("Please provide Email")
    } else if (orderDetails.level === "Regional" && !orderDetails.institution) {
      setToast("Please provide institution")
    } else if (
      orderDetails.level === "Adjoining Group" &&
      !orderDetails.adjoining_group
    ) {
      setToast("Please provide Adjoining Group")
    } else if (orderDetails.level === "Cluster" && !orderDetails.cluster) {
      setToast("Please provide Cluster")
    } else if (!orderDetails.address && !isSelfPickup) {
      setToast("Please provide Delivery Address")
    } else {
      pass = true
    }
    return pass
  }

  const sendEmail = async (order: Order) => {
    try {
      await fetch(
        "https://us-central1-training-institute-01.cloudfunctions.net/sendOrder",
        {
          method: "post",
          body: JSON.stringify(order),
        }
      )
    } catch (error) {
      console.error("Email sending error:", error)
    }
  }

  const handlePlaceOrder = async () => {
    const isPass = validateInputs()
    if (!isPass) {
      return
    }
    const db = firebase.firestore()
    setIsLoading(true)
    const order: Order = {
      ...orderDetails,
      orders,
      location: loc,
      created: firebase.firestore.Timestamp.now(),
    }
    await db.collection("orders").add(order)
    await sendEmail(order)
    setIsLoading(false)
    const newProducts = []
    setProducts(newProducts)
    backupProducts({
      loc,
      products: newProducts,
    })
    navigate("/app/done")
  }

  const adjoiningGroups = getAdjoiningGroups(locations, loc)
  const clusters = getClusters(locations, orderDetails.adjoining_group)
  const pickups = ["Postal Delivery", "Self Pickup"]
  const isSelfPickup = orderDetails.pickupOptions === "Self Pickup"

  return (
    <Layout
      headerHeight={theme.secondaryHeaderHeight}
      renderToolbar={renderToolbar}
    >
      <SEO title="Place Order" />
      <Column fillHeight justifySpaceBetween>
        <Panel column>
          <RowInput
            label="Full Name"
            placeholder="Enter your name here"
            value={orderDetails.individual}
            onChange={e => handleChange(e, "individual")}
          />
          <RowInput
            label="Phone Number"
            placeholder="+60"
            value={orderDetails.phoneNumber}
            onChange={e => handleChange(e, "phoneNumber")}
          />
          <RowInput
            label="Email"
            placeholder="name@email.com"
            value={orderDetails.email}
            onChange={e => handleChange(e, "email")}
          />
          <RowSelect
            label="Level"
            value={orderDetails.level}
            onChange={e => handleChange(e, "level")}
            selections={LevelSelections}
          />
          {orderDetails.level === "Regional" && (
            <RowSelect
              label="Institution"
              value={orderDetails.institution}
              onChange={e => handleChange(e, "institution")}
              selections={InstitutionSelections}
            />
          )}
          {adjoiningGroups?.length > 0 && orderDetails.level !== "Regional" && (
            <RowSelect
              label="Adjoining Group"
              value={orderDetails.adjoining_group}
              onChange={handleAdjoiningChange}
              selections={adjoiningGroups}
            />
          )}
          {clusters?.length > 0 &&
            orderDetails.level !== "Regional" &&
            orderDetails.level !== "Adjoining Group" && (
              <RowSelect
                label="Receiving Cluster"
                value={orderDetails.cluster}
                onChange={e => handleChange(e, "cluster")}
                selections={clusters}
              />
            )}
          <RowSelect
            label="Pickup Options"
            value={orderDetails.pickupOptions}
            onChange={handlePickupOptions}
            selections={pickups}
          />
          <RowTextArea
            label={!isSelfPickup ? "Delivery Address" : "Self Pickup Point"}
            placeholder={
              !isSelfPickup
                ? "Enter your delivery address here"
                : "Please pickup at TIB office"
            }
            value={orderDetails.address}
            onChange={e => handleChange(e, "address")}
          />
          <RowInput
            label="Remarks"
            value={orderDetails.remarks}
            onChange={e => handleChange(e, "remarks")}
            placeholder="Enter any remarks here"
          />
        </Panel>
        <Row fillWidth>
          <Button
            fillWidth
            margin={"16px"}
            padding={"8px"}
            onClick={handlePlaceOrder}
            pointer
          >
            Place Order
          </Button>
        </Row>
      </Column>
    </Layout>
  )
}

export const includeIdToData = (doc: any): any => ({
  ...doc.data(),
  id: doc.id,
})

export default PlaceOrderPage
