import gql from 'graphql-tag'

const FOOTER_QUERY = gql`
query Footer {
  footer {
    data {
      attributes {
        Content {
          __typename
          ... on ComponentFooterComponentsImage {
            Image {
              data {
                attributes {
                  url
                  name
                  width
                }
              }
            }
            Space
          }
          ... on ComponentFooterComponentsText {
            Text
            Space
          }
          ... on ComponentFooterComponentsIcons {
            Entry {
              id
              Icon
              Link
              Color
            }
            Space
          }
        }
      }
    }
  }
}
`

export default FOOTER_QUERY
