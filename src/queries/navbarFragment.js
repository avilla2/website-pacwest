import gql from 'graphql-tag'

const NAVBAR_FRAGMENT = gql`
fragment NavbarFragment on Navbar {
  Style
  Appearance
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
`

export default NAVBAR_FRAGMENT
