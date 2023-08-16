import React from 'react'
import Box from '@mui/material/Box'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'

const classes = {
  root: {
    margin: 'auto 6%'
  }
}

export default function Paragraph ({ content }) {
  return (
        <Box sx={classes.root}>
            <Typography component="div">
                <ReactMarkdown>{content.Body}</ReactMarkdown>
            </Typography>
        </Box>
  )
}
