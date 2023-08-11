import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Hidden } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    root: {
    },
    toolbar: {
        justifyContent: "center",
        margin: "0 4% 0 4%;",
        minHeight: 128,
        alignItems: 'center',
        color: 'white',
      },
    title: {
        fontFamily: '"Poppins", sans-serif',
    },
    fonts: {
        fontFamily: '"Poppins", sans-serif',
        flexGrow: 1,
    },
    hovered: {
        color: theme.palette.secondary.main,
    },
    mobileLogo: {
      width: "2.2rem",
    },
    mobileTitle: {
      flexGrow: 1,
      textAlign: "left",
      fontFamily: '"Poppins", sans-serif',
    },
    mobileNav: {
      justifyContent: "space-between",
    },
    mobileDrawer: {
      width: 250,
      color: 'white',
      backgroundColor: "#002f6c",
      flexGrow: 1,
    },
    divider: {
      backgroundColor: "white",
    },
}));


export default function Navbar({ page, content, mobileData }) {
  const classes = useStyles();
  const trigger = useScrollTrigger({ disableHysteresis: true });
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(-1)
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const isExternal = (text) => {
    if (text.charAt(0) === '/') {
        return false;
    } else {
        return true;
    }
  }

  const NavButton = ({title, link, external, id}) => {
    return (
      <ButtonBase component={external? "a" : Link} onClick={() => setActive(id)} href={link} to={link} className={`${classes.fonts} link`} color="inherit">
        <span className={`mask ${active === id? 'active' : ''}`}>
          <div className={`link-container ${active === id? 'active' : ''}`}>
            <span className={`link-title1 title ${active === id? 'active' : ''}`}>{title}</span>
            <span className={`${classes.hovered} link-title2 title ${active === id? 'active' : ''}`}>{title}</span>
          </div>
        </span>
      </ButtonBase>
    );
  }

  const NavButtonIcon = ({link, external, src, alt, id, width}) => {
    return (
      <Button onClick={() => setActive(id)} component={external? "a" : Link} href={link} to={link} className={classes.title}>
        <img width={width ? width : 80} src={src} alt={alt} />
      </Button>
    );
  }

  const MobileDrawer = ({ links, drawerLink, drawerText }) => {
    return (
      <div
        className={classes.mobileDrawer}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem onClick={() => setActive(-1)} component={Link} to={drawerLink} button>
            <ListItemText primaryTypographyProps={{"variant": "h5"}} primary={drawerText} />
          </ListItem>
          <Divider variant="middle" className={classes.divider} />
          {links.map((item, key) => (
            item.__typename === 'ComponentNavbarComponentsTextLink' ?
              <div key={key}>
                <ListItem button onClick={() => setActive(key)} component={isExternal(item.Link) ? "a" : Link} href={item.Link} to={item.Link}>
                  <ListItemText className={`${classes.title} ${active === key? classes.hovered : ''}`} primary={item.Title} />
                </ListItem>
              </div>
            : null
          ))}
        </List>
      </div>
  )};

  return (
    <div className={classes.root}>

      {/* Desktop Navbar */}
      <Hidden smDown>
        <AppBar position="fixed" elevation={!trigger ? 0 : 1} color={ !trigger ? "transparent" : "primary" } >
          <Toolbar className={classes.toolbar}>
            {content.map((item, key) => {
                return (
                  item.__typename === 'ComponentNavbarComponentsTextLink' ? 
                  <NavButton key={key} id={key} external={isExternal(item.Link)} title={item.Title} link={item.Link} /> : 
                  <NavButtonIcon key={key} id={key} width={item.Width} link={item.Link} src={`${process.env.REACT_APP_BACKEND_URL}${item.Image.url}`} alt={item.Image.name} />
                )
            })}
          </Toolbar>
        </AppBar>
      </Hidden>

      {/* Mobile Navbar */}
      <Hidden mdUp>
        <AppBar position="fixed">
          <Toolbar className={classes.mobileNav}>
            <IconButton onClick={() => setActive(-1)} component={Link} to={mobileData.IconLink} edge="start">
              <img className={classes.mobileLogo}  src={`${process.env.REACT_APP_BACKEND_URL}${mobileData.MobileIcon.url}`} alt="Logo"/>
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
              <MobileDrawer links={content} drawerLink={mobileData.DrawerLink} drawerText={mobileData.DrawerText} />
            </Drawer>
            <Typography variant="h6" className={classes.mobileTitle}>
              {page}
            </Typography>
            <IconButton edge="end" onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        {/* Extra toolbar for spacing */}
        <Toolbar />
      </Hidden>
    </div>
  );
}