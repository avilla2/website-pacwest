import React from 'react'
import GetIcon from '../utils/getIcon'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const classes = {
  root: {
    margin: '0px'
  },
  Blue: (theme) => ({
    color: theme.palette.primary.main
  }),
  Red: (theme) => ({
    color: theme.palette.warning.main
  }),
  Green: (theme) => ({
    color: theme.palette.success.main
  }),
  Gold: (theme) => ({
    color: theme.palette.secondary.main
  })
}

export default function Icons ({ content }) {
  return (
        <Box sx={classes.root}>
            <Container>
                {content.Entry.map((item, key) => {
                  return (
                        <IconButton key={key} component={Link} href={item.Link}>
                            <GetIcon iconName={item.Icon} sx={classes[item.Color]} fontSize="large" />
                        </IconButton>
                  )
                })}
            </Container>
        </Box>
  )
}
