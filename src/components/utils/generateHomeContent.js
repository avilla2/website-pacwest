import React from 'react'
import renderComponent from './renderPageComponent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const classes = {
  root: {
    width: '100%'
  },
  head: {
    margin: '5% 0% 2% 0%'
  }
}

export default function GeneratePageContent (props) {
  return (
        <Box sx={classes.root}>
            {
                props.content.__typename !== 'ComponentHomePageComponentsIntro'
                  ? <Typography sx={classes.head} variant="h2" gutterBottom> {props?.content?.Title}</Typography>
                  : <></>
            }
            {renderComponent(props.content)}
        </Box>
  )
}
