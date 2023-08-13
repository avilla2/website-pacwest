import React from 'react'
import Box from '@mui/material/Box'
import ReactMarkdown from 'react-markdown'

const classes = {
  root: {
    margin: '50px 3%',
    padding: '0 5%',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '24px'
  }
}

export default function Paragraph ({ content }) {
  return (
        <Box className={classes.root}>
            <ReactMarkdown >{content.Body}</ReactMarkdown>
        </Box>
  )
}
