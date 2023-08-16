import gql from 'graphql-tag'
import FOOTER_FRAGMENT from './footerFragment'
import NAVBAR_FRAGMENT from './navbarFragment'
import PAGE_CONTENT_FRAGMENT from './pageContentFragment'

const APP_QUERY = gql`
query App {
  navbar {
    data {
      id
      attributes {
        ...NavbarFragment
      }
    }
  }
  homepage {
    data {
      id
      attributes {
        PageName
        Content {
          ...Content
        }
      }
    }
  }
  contentPages {
    data {
      attributes {
        Name
        Link
        Content {
          ...Content
        }
      }
    }
  }
  footer {
    data {
      id
      attributes {
        ...FooterFragment
      }
    }
  }
}
${NAVBAR_FRAGMENT}
${FOOTER_FRAGMENT}
${PAGE_CONTENT_FRAGMENT}
`

export default APP_QUERY
