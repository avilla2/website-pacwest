import gql from 'graphql-tag'

const CONTENT_PAGE_QUERY = gql`
query Content {
  contentPages {
    data {
      attributes {
        Name
        Link
        Content {
          __typename
          ... on ComponentHomePageComponentsIntro {
            id
            Image {
              data {
                attributes {
                  url
                  width
                }
              }
            }
            Video {
              data {
                attributes {
                  url
                  width
                }
              }
            }
            IntroText
          }
          ... on ComponentHomePageComponentsGallery {
            id
            Title
            Pictures {
              data {
                attributes {
                  url
                  width
                }
              }
            }
          }
          ... on ComponentHomePageComponentsMedia {
            id
            Title
            asset {
              data {
                attributes {
                  Name
                  Caption
                  Content {
                    __typename
                    ... on ComponentAssetComponentsPdf {
                      File {
                        data {
                          attributes {
                            url
                            width
                          }
                        }
                      }
                    }
                    ... on ComponentAssetComponentsVideo {
                      Autoplay
                      Loop
                      Muted
                      Width
                      Controls
                      File {
                        data {
                          attributes {
                            url
                            width
                          }
                        }
                      }
                    }
                    ... on ComponentAssetComponentsImage {
                      Style
                      Width
                      Height
                      File {
                        data {
                          attributes {
                            url
                            width
                            alternativeText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          ... on ComponentContentPageComponentsParagraph {
            id
            Title
            Body
          }
          ... on ComponentContentPageComponentsFaq {
            id
            Title
            Entry {
              Title
              Body
              id
            }
          }
          ... on ComponentContentPageComponentsForm {
            id
            Title
            bodyTitle
            sendTo
          }
          ... on ComponentContentPageComponentsGrid {
            id
            Title
            Entry {
              id
              Picture {
                data {
                  attributes {
                    url
                  }
                }
              }
              Caption
            }
          }
        }
      }
    }
  }
}
`

export default CONTENT_PAGE_QUERY
