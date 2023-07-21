import gql from "graphql-tag";

const NAVBAR_QUERY = gql`
query Navbar {
  navbar {
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
					url
          width
          name
        }
        Link
        Width
      }
    }
    MobileConfig {
      MobileIcon {
        url
        name
        width
      }
      DrawerText
      DrawerLink
      IconLink
    }
  }
}
`;

export default NAVBAR_QUERY;