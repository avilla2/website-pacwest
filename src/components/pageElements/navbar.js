import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import isExternal from '../utils/isExternalLink'

const classes = {
  root: {},
  none: {},
  toolbarSpaced: {
    justifyContent: 'flex-start',
    margin: '0 2% 0 2%;',
    minHeight: 128,
    alignItems: 'center',
    color: 'white',
    '& a:first-of-type': {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-start'
    }
  },
  toolbarSpread: {
    justifyContent: 'center',
    margin: '0 2% 0 2%;',
    minHeight: 128,
    alignItems: 'center',
    color: 'white',
    '& a': {
      flexGrow: 1
    }
  },
  toolbarLeft: {
    justifyContent: 'flex-start',
    margin: '0 2% 0 2%;',
    minHeight: 128,
    alignItems: 'center',
    color: 'white'
  },
  title: {
    display: 'block',
    fontSize: '16px',
    lineHeight: '16px',
    transition: 'transform 0.4s ease'
  },
  hovered: (theme) => ({
    color: theme.palette.secondary.main
  }),
  mobileLogo: {
    width: '2.2rem'
  },
  mobileTitle: {
    flexGrow: 1,
    textAlign: 'left'
  },
  mobileNav: {
    justifyContent: 'space-between'
  },
  mobileDrawer: (theme) => ({
    width: 230,
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1
  }),
  divider: {
    backgroundColor: 'white'
  }
}

export default function Navbar ({ page, navIndex, content, mobileData, style, appearance }) {
  const hidden = useMediaQuery(theme => theme.breakpoints.up('md'))
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 65 })
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(-1)

  React.useEffect(() => {
    if (navIndex) {
      setActive(navIndex)
    }
  })

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setIsOpen(open)
  }

  const NavButton = ({ title, link, external, id }) => {
    return (
      <ButtonBase component={external ? 'a' : Link} onClick={() => setActive(id)} href={link} to={link} className="link" color="inherit">
        <Container className={`mask ${active === id ? 'active' : ''}`}>
          <Box className={`link-container ${active === id ? 'active' : ''}`}>
            <Typography sx={classes.title} className={`link-title1 ${active === id ? 'active' : ''}`}>
              {title}
            </Typography>
            <Typography sx={[classes.hovered, classes.title]} className={`link-title2 ${active === id ? 'active' : ''}`}>
              {title}
            </Typography>
          </Box>
        </Container>
      </ButtonBase>
    )
  }

  const NavButtonIcon = ({ link, external, src, alt, id, width }) => {
    return (
      <Button onClick={() => setActive(id)} component={external ? 'a' : Link} href={link} to={link} sx={classes.title}>
        <img width={width || 80} src={src} alt={alt} />
      </Button>
    )
  }

  const MobileDrawer = ({ links, drawerLink, drawerText }) => {
    return (
      <Box
        sx={classes.mobileDrawer}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem onClick={() => setActive(-1)} component={Link} to={drawerLink} button>
            <ListItemText primaryTypographyProps={{ variant: 'h5' }} primary={drawerText} />
          </ListItem>
          <Divider variant="middle" sx={classes.divider} />
          {links.map((item, index) => (
            item.__typename === 'ComponentNavbarComponentsTextLink'
              ? <div key={index}>
                <ListItem button onClick={() => setActive(item.Link)} component={isExternal(item.Link) ? 'a' : Link} href={item.Link} to={item.Link}>
                  <ListItemText sx={[classes.title, active === item.Link ? classes.hovered : classes.none]} primary={item.Title} />
                </ListItem>
              </div>
              : null
          ))}
        </List>
      </Box>
    )
  }

  const pickStyle = () => {
    switch (style) {
      case 'Spaced':
        return classes.toolbarSpaced
      case 'Left_Aligned':
        return classes.toolbarLeft
      default:
        return classes.toolbarSpread
    }
  }

  return (
    <Box sx={classes.root}>
      {/* Desktop Navbar */}
      {hidden
        ? <AppBar position="fixed" elevation={!trigger ? 0 : 1} color={!trigger && appearance === 'fade_in' ? 'transparent' : 'primary' } >
          <Toolbar sx={pickStyle()}>
            {content.map((item, index) => {
              return (
                item.__typename === 'ComponentNavbarComponentsTextLink'
                  ? <NavButton key={index} id={item.Link} external={isExternal(item.Link)} title={item.Title} link={item.Link} />
                  : <NavButtonIcon key={index} id={item.Link} width={item.Width} link={item.Link} src={`${process.env.REACT_APP_BACKEND_URL}${item.Image.data.attributes.url}`} alt={item.Image.data.attributes.name} />
              )
            })}
          </Toolbar>
        </AppBar>
        : <>
      {/* Mobile Navbar */}
        <AppBar position="fixed">
          <Toolbar sx={classes.mobileNav}>
            <IconButton onClick={() => setActive('')} component={Link} to={mobileData.IconLink} edge="start">
              <img style={classes.mobileLogo} src={`${process.env.REACT_APP_BACKEND_URL}${mobileData.MobileIcon.data.attributes.url}`} alt="Logo"/>
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
              <MobileDrawer links={content} drawerLink={mobileData.DrawerLink} drawerText={mobileData.DrawerText} />
            </Drawer>
            <Typography variant="h6" sx={classes.mobileTitle}>
              {page}
            </Typography>
            <IconButton edge="end" onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Extra toolbar for spacing */}
        <Toolbar />
      </>
      }
    </Box>
  )
}
