import gql from 'graphql-tag'

const PAGE_CONTENT_FRAGMENT = gql`
fragment Content on ContentPageContentDynamicZone {
    __typename
    ... on ComponentHomePageComponentsIntro {
    id
    File {
        data {
            attributes {
                mime
                url
                width
                alternativeText
            }
        }
    }
    IntroText
    TextPosition
    }
    ... on ComponentHomePageComponentsGallery {
    id
    Title
    Pictures {
        data {
            attributes {
                url
                width
                alternativeText
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
    ... on ComponentContentPageComponentsButtons {
        id
        Entry {
            Link
            Text
        }
    }
}
`
export default PAGE_CONTENT_FRAGMENT
