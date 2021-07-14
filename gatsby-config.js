require('dotenv').config()
module.exports = {
  siteMetadata: {
    title: `Training Institute Materials`,
    description: `Find your training institute materials here`,
    author: `dandyling@gmail.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: "@deanc/gatsby-source-firestorer",
      options: {
        credential: {
          "type": "service_account",
          "project_id": process.env.FIREBASE_PROJECT_ID,
          "private_key_id": process.env.FIREADMIN_PRIVATE_KEY_ID,
          "private_key": process.env.node_env === "development" ? process.env.FIREADMIN_PRIVATE_KEY : process.env.FIREADMIN_PRIVATE_KEY,
          "client_email": process.env.FIREADMIN_CLIENT_EMAIL,
          "client_id": process.env.FIREADMIN_CLIENT_ID,
          "auth_uri": "https://accounts.google.com/o/oauth2/auth",
          "token_uri": "https://oauth2.googleapis.com/token",
          "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
          "client_x509_cert_url": process.env.FIREADMIN_CLIENT_X509_CERT_URL
        },
        types: [
          {
            type: "Book",
            collection: "books",
            map: doc => ({
              name: doc.name,
              price: doc.price,
              category: doc.category,
              id: doc.id,
              location: doc.location,
              order: doc.order,
              image: doc.image,
            }),
          },
          {
            type: "Category",
            collection: "categories",
            map: doc => ({
              name: doc.name,
              id: doc.id,
              location: doc.location,
            }),
          },
          {
            type: "Location",
            collection: "locations",
            map: doc => ({
              id: doc.id,
              contains: doc.contains,
            }),
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
