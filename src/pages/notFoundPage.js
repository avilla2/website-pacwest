import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const classes = {
  root: {
    width: '100%'
  },
  returnButton: (theme) => ({
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main
  })
}

export default function ContentPage ({ setPage }) {
  useEffect(() => {
    setPage('Not Found')
  })
  return (
        <Box className={classes.root}>
            <Typography component="h1">Looks Like your Lost...</Typography>
            <Typography component="h2">This Page is Not Available</Typography>
            <Button variant="outlined" size="large" component={Link} to="/" sx={classes.returnButton}>
                Return Home
            </Button>
        </Box>
  )
}
