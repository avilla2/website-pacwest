import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import ReactMarkdown from 'react-markdown'

const styles = {
  base: (theme) => ({
    overflow: 'hidden',
    [theme.breakpoints.down('xl')]: {
      position: 'relative'
    }
  }),
  video: {
    width: '100%'
  },
  videoMobile: {
    height: '80vh',
    width: 'auto'
  },
  overlay: (theme) => ({
    position: 'absolute',
    bottom: '0%',
    left: '5%',
    textAlign: 'left',
    fontFamily: '"Poppins", sans-serif',
    color: 'white',
    textShadow: '3px 3px 20px #2f2f2f',
    [theme.breakpoints.up('md')]: {
      fontSize: '275%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '150%'
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '125%'
    }
  })
}

export default function Intro ({ content }) {
  const hidden = useMediaQuery(theme => theme.breakpoints.up('sm'))

  return (
    <Box sx={styles.base}>
      {hidden
        ? <video style={styles.video} loop autoPlay muted>
          <source src={`${process.env.REACT_APP_BACKEND_URL}${content.Video.data.attributes.url}`} type="video/mp4" />
        </video>
        : <video style={styles.videoMobile} loop autoPlay muted>
          <source src={`${process.env.REACT_APP_BACKEND_URL}${content.Video.data.attributes.url}`} type="video/mp4" />
        </video>
      }
      <Box sx={styles.overlay}>
        <ReactMarkdown>{content.IntroText}</ReactMarkdown>
      </Box>
    </Box>
  )
}
