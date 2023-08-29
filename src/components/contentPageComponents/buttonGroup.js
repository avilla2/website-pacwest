import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import isExternal from '../utils/isExternalLink'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import ButtonGroup from '@mui/material/ButtonGroup'
import useMediaQuery from '@mui/material/useMediaQuery'
import AnimationProvider from '../utils/animationProvider'

const classes = {
  root: {
    margin: 'auto 5%'
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}
export default function Buttons ({ content }) {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const getButtonColor = (color) => {
    const trueColor = color || theme.palette.primary.main
    switch (content.ButtonStyle) {
      case 'contained':
        return { backgroundColor: trueColor }
      case 'text':
        return { color: trueColor }
      default:
        return { borderColor: trueColor }
    }
  }

  const getButtonSpacing = () => {
    switch (content.ButtonArrangement) {
      case 'spaced_evenly':
        return { justifyContent: 'space-evenly' }
      default:
        return { justifyContent: 'center', gap: theme.spacing(2) }
    }
  }

  const ButtonGroupRoot = ({ children }) => {
    const mobileXS = useMediaQuery('(min-width:500px)')
    if (content.ButtonArrangement === 'together' || content.ButtonArrangement === null) {
      return <ButtonGroup orientation={mobileXS ? 'horizontal' : 'vertical'}>{children}</ButtonGroup>
    } else {
      return <Box sx={classes.buttonGroup} style={getButtonSpacing()}>{children}</Box>
    }
  }

  return (
    <AnimationProvider animation={content?.Style?.Animation} direction="down">
        <Box sx={classes.root}>
            <ButtonGroupRoot>
            {content.Entry.map((entry, index) => (
                <Button
                    key={index}
                    variant={content?.ButtonStyle ? content.ButtonStyle : 'outlined'}
                    size={mobile ? 'regular' : 'large'}
                    component={isExternal(entry.Link) ? 'a' : Link}
                    href={entry.Link}
                    to={entry.Link}
                    sx={getButtonColor(entry.ButtonColor)}
                >
                {entry.Text}
                </Button>
            ))}
            </ButtonGroupRoot>
        </Box>
    </AnimationProvider>
  )
}
