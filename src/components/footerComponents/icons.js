import React from 'react'
// import GetIcon from '../utils/getIcon'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const classes = {
  root: {
    margin: '0px'
  },
  Primary: (theme) => ({
    color: theme.palette.primary.main
  }),
  Secondary: (theme) => ({
    color: theme.palette.warning.main
  }),
  Warning: (theme) => ({
    color: theme.palette.success.main
  }),
  Success: (theme) => ({
    color: theme.palette.secondary.main
  })
}

const generateIcon = (iconName) => {
  switch (iconName) {
    case 'Instagram':
      return <InstagramIcon fontSize='large' />
    case 'Facebook':
      return <FacebookIcon fontSize='large' />
    case 'Youtube':
      return <YouTubeIcon fontSize='large' />
    case 'Twitter':
      return <TwitterIcon fontSize='large' />
    default:
      return <OpenInNewIcon fontSize='large' />
  }
}
export default function Icons ({ content }) {
  return (
        <Box sx={classes.root}>
            <Container>
                {content.Entry.map((item, key) => {
                  return (
                        <IconButton key={key} component={Link} href={item.Link}>
                            {generateIcon(item.Icon)}
                        </IconButton>
                  )
                })}
            </Container>
        </Box>
  )
}
