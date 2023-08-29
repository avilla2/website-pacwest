import gql from 'graphql-tag'

const SITESETTINGS_FRAGMENT = gql`
fragment SiteSettingsFragment on SiteSettings {
  Palette {
    primary
    success
    secondary
    warning
    info
  }
}
`

export default SITESETTINGS_FRAGMENT
