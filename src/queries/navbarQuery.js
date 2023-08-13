import gql from 'graphql-tag'

const NAVBAR_QUERY = gql`
query Navbar {
  navbar {
    data {
      id
      attributes {
        Style
        Items {
          __typename
          ... on ComponentNavbarComponentsTextLink {
            Title
            Link
            id
          }
          ... on ComponentNavbarComponentsImageLink {
            id
            Image {
              data {
                attributes {
                  url
                  width
                  name
                }
              }
            }
            Link
            Width
          }
        }
        MobileConfig {
          MobileIcon {
            data {
              attributes {
                url
                width
                name
              }
            }
          }
          DrawerText
          DrawerLink
          IconLink
        }
      }
    }
  }
}
`

export default NAVBAR_QUERY
