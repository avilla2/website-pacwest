import { useTheme } from '@mui/material/styles'

const calculatePadding = (lastComponent, fullHeightComponents, contentType) => {
  const theme = useTheme()
  let topSpacing = null
  let bottomSpacing = null
  if (!fullHeightComponents.includes(contentType)) {
    topSpacing = theme.spacing(3)
    bottomSpacing = theme.spacing(3)
  }
  if (lastComponent) {
    bottomSpacing = theme.spacing(5)
  }
  if (!(topSpacing && bottomSpacing)) {
    return null
  }
  return `${topSpacing} 0 ${bottomSpacing} 0`
}

export default calculatePadding
