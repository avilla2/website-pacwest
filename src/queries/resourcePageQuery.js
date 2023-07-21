import gql from "graphql-tag";

const RESOURCE_PAGE_QUERY = gql`
query Resources {
    resources {
      id
      Title
      Thumbnail {
        Description
        External
        Link
        Image {
          url
          width
          name
        }
      }
      Content {
        __typename
        ... on ComponentHomePageComponentsIntro {
          id
          Image {
            url
            width
          }
          Video {
            url
            width
          }
          IntroText {
            Line1
            Line2
            Line3
          }
        }
        ... on ComponentHomePageComponentsGallery {
          id
          Title
          Pictures {
            url
            width
            id
          }
        }
          ... on ComponentHomePageComponentsTextGrid {
            id
            MainTitle
          Subtitle
          Header
          Entry {
            id
            Text
            Icon
          }
          }
        ... on ComponentHomePageComponentsMedia {
          id
          Title
          Buttons {
            id
            Text
            Link
          }
          PDF {
            File {
              id
              url
              width
            }
          }
        }
        ... on ComponentHomePageComponentsCards {
          id
          Title
          Cards {
            Title
            Text
            Link
            LinkText
            Width
            LargeWidth
          }
        }
        ... on ComponentHomePageComponentsFreestyle {
          id
          Text
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
              id
              url
            }
            Caption
          }
          }
          ... on ComponentContentPageComponentsButtons {
          id
          Title
          Entry {
            Text
            Link
          }
          }
      }
    }
  }
`;

export default RESOURCE_PAGE_QUERY;