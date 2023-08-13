import React from 'react'
import ReactMarkdown from 'react-markdown'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const classes = {
  root: {
    margin: '40px 10% 40px 10%'
  },
  image: {
    width: '95%'
  },
  caption: {
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '28px'
  }
}

export default function PictureGrid ({ content }) {
  return (
        <Box sx={classes.root}>
            <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    spacing={3}
                >
                    {content.Entry.map((entry, index) => {
                      return (
                            <Grid xs={6} sm={4} md={3} item key={index}>
                                <img
                                    style={classes.image}
                                    src={`${process.env.REACT_APP_BACKEND_URL}${entry.Picture.url}`}
                                    alt={entry.Picture.id}
                                />
                                <Box sx={classes.caption}>
                                    <ReactMarkdown>{entry.Caption}</ReactMarkdown>
                                </Box>
                            </Grid>
                      )
                    })}
            </Grid>
        </Box>
  )
}
