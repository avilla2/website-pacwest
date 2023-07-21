import gql from "graphql-tag";

const FOOTER_QUERY = gql`
query Footer {
  footer {
  	Content {
      __typename
      ... on ComponentFooterComponentsImage {
        Image {
          url
          name
          width
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
`;

export default FOOTER_QUERY;