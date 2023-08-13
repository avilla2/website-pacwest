import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const classes = {
  root: {
    margin: '40px 10% 40px 10%'
  },
  btnmenu: (theme) => ({
    color: theme.palette.warning.main,
    borderColor: `${theme.palette.warning.main}!important`,
    margin: '10px 10px 0px'
  }),
  buttonRoot: {
    '& .MuiButtonGroup-root': {
      display: 'inline'
    }
  },
  links: {
    display: 'block'
  }
}

export default function Template ({ content }) {
  const isExternal = (text) => {
    if (text.charAt(0) === '/') {
      return false
    }
    return true
  }

  return (
    <Box sx={classes.root}>
      <Box sx={classes.links}>
        <ButtonGroup
          color="inherit"
          aria-label=" primary button group"
          size="large"
          sx={classes.buttonRoot}
        >
          {content.Entry.map((entry, index) => (
            <Button key={index} component={isExternal(entry.Link) ? 'a' : Link} href={entry.Link} to={entry.Link} sx={classes.btnmenu}>
              {entry.Text}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  )
}
