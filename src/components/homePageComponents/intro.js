import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import ReactMarkdown from 'react-markdown'

const styles = {
  base: {
    overflow: 'hidden',
    position: 'relative'
  },
  video: {
    width: '100%'
  },
  videoMobile: {
    height: '80vh',
    width: 'auto'
  },
  overlay: (theme) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    display: 'flex',
    padding: '3%',
    boxSizing: 'border-box',
    fontFamily: theme.typography.fontFamily,
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
  }),
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  bottomLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    textAlign: 'left'
  },
  bottomRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right'
  }
}

const getMime = (mime) => {
  return mime.split('/')[0]
}

const GenerateMedia = ({ data }) => {
  const hidden = useMediaQuery(theme => theme.breakpoints.up('sm'))

  if (data.length <= 1) {
    const attributes = data[0].attributes
    const mime = getMime(attributes.mime)
    if (mime === 'video') {
      return (
        <video style={hidden ? styles.video : styles.videoMobile} loop autoPlay muted playsInline>
          <source
            src={`${process.env.REACT_APP_BACKEND_URL}${attributes.url}`}
            type={attributes.mime}
            alt={attributes.alternativeText}
          />
        </video>
      )
    } else if (mime === 'image') {
      return (
        <img
          style={hidden ? styles.video : styles.videoMobile}
          src={`${process.env.REACT_APP_BACKEND_URL}${attributes.url}`}
          alt={attributes.alternativeText}
        />
      )
    }
  } else if (data.length > 1) {
    return (
      // TODO Implement Carousel
      <></>
    )
  } else {
    return <></>
  }
}

const getIntroStyle = (style) => {
  switch (style) {
    case 'Centered':
      return styles.centered
    case 'Bottom_Right':
      return styles.bottomRight
    default:
      return styles.bottomLeft
  }
}

export default function Intro ({ content }) {
  return (
    <Box sx={styles.base}>
      <GenerateMedia data={content.File.data} />
      <Box sx={[styles.overlay, getIntroStyle(content.TextPosition)]}>
        <ReactMarkdown>{content.IntroText}</ReactMarkdown>
      </Box>
    </Box>
  )
}
