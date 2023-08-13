import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import renderComponent from './renderPageComponent'

const classes = {
  root: {
    width: '100%'
  },
  title: (theme) => ({
    letterSpacing: 4,
    margin: '2% 10%',
    color: theme.palette.primary.main
  })
}

export default function GeneratePageContent (props) {
  return (
        <Box sx={classes.root}>
            <Typography component="h2" sx={classes.title}>{props.content?.Title}</Typography>
            {renderComponent(props.content)}
        </Box>
  )
}
