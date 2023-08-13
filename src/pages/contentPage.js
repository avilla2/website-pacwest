import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import GeneratePageContent from '../components/utils/generatePageContent'

const titleHeight = '145px'
const classes = {
  root: {
    width: '100%',
    flexGrow: 2
  },
  base: (theme) => ({
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: titleHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'fixed',
    zIndex: -2
  }),
  title: {
    color: 'white',
    fontSize: '1.5rem',
    marginBottom: '20px'
  },
  page: (theme) => ({
    marginTop: '5%',
    [theme.breakpoints.up('md')]: {
      marginTop: titleHeight,
      backgroundColor: 'white',
      paddingTop: '1px'
    }
  })
}

export default function ContentPage ({ setPage, name, content }) {
  const hidden = useMediaQuery(theme => theme.breakpoints.up('md'))
  useEffect(() => {
    setPage(name)
  })
  return (
        <Box sx={classes.root}>
            {hidden &&
                <Paper elevation={0} sx={classes.base} square>
                    <Typography component="h1" sx={classes.title}>{name}</Typography>
                </Paper>

            }
                <Box sx={classes.page}>
                    {content.map((item, index) => {
                      return (
                            <GeneratePageContent key={index} content={item}/>
                      )
                    })}
                </Box>
        </Box>
  )
}
