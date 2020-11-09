import { graphql, useStaticQuery } from "gatsby"
import GalleryPage from "../components/gallery-page"
import React from "react"

export const STIBPage = () => {
  const data = useStaticQuery(query)
  return <GalleryPage data={data} loc="STIB" />
}

export const query = graphql`
  query {
    allBook(filter: { location: { eq: "STIB" } }) {
      edges {
        node {
          id
          name
          category
          image
          price
          order
          fields {
            slug
          }
        }
      }
    }
    allCategory(filter: { location: { eq: "STIB" } }) {
      edges {
        node {
          name
          location
          id
        }
      }
    }
    allLocation {
      edges {
        node {
          id
          contains
        }
      }
    }
  }
`

export default STIBPage
