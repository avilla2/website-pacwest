import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import renderComponent from './renderPageComponent'

const classes = {
  root: {
    width: '100%'
  },
  title: (theme) => ({
    letterSpacing: 1,
    margin: '2% 10% 1% 10%',
    fontSize: '1.5rem',
    color: theme.palette.secondary.main
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
