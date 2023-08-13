import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import GenerateFooterContent from '../utils/generateFooterContent'

const classes = {
  root: {
    padding: '50px 20px',
    marginTop: '50px'
  }
}

export default function Footer ({ content }) {
  return (
        <Box sx={classes.root} bgcolor="info.main" component="div">
           <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
            >
                {content.map((item, key) => {
                  return (
                        <Grid item key={key} md={item.Space}>
                            <GenerateFooterContent content={item} />
                        </Grid>
                  )
                })}
            </Grid>
        </Box>
  )
}
