import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import GenerateHomeContent from '../components/utils/generateHomeContent'

const classes = {
  root: {
    width: '100%',
    flexGrow: 1
  }
}

export default function ContentPage ({ setPage, content, pageName }) {
  useEffect(() => {
    setPage(pageName)
  })
  return (
        <Box sx={classes.root}>
            {content.map((item, index) => {
              return (
                    <GenerateHomeContent key={index} content={item}/>
              )
            })}
        </Box>
  )
}
