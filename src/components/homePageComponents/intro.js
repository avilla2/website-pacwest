import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Hidden } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    base: {
      position: "relative",
    },
    root: {
      width: "100%",
    },
    title: {
      position: "absolute",
      bottom: "8%",
      left: "5%",
      textAlign: "left",
      fontFamily: '"Poppins", sans-serif',
    },
    ends: {
      fontFamily: '"Poppins", sans-serif',
      color: "white",
      textShadow: "3px 3px 20px #2f2f2f",
      [theme.breakpoints.up('md')]: {
        fontSize: "275%",
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: "150%",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "200%",
      },
    },
    middle: {
      fontFamily: '"Poppins", sans-serif',
      color: "#872",
      textShadow: "2px 2px 7px #2f2f2f",
      [theme.breakpoints.up('md')]: {
        fontSize: "275%",
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: "150%",
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: "200%",
        
      },
    },
  }));

export default function Intro({ content }) {
  const classes = useStyles();
  return (
    <Box className={classes.base} component="div">
      <Hidden xsDown>
        <video className={classes.root} loop autoPlay muted>
          <source src={`${process.env.REACT_APP_BACKEND_URL}${content.Video.url}`} type="video/mp4" />
        </video>
      </Hidden>
      <Hidden smUp>
        <img className={classes.root} src={`${process.env.REACT_APP_BACKEND_URL}${content.Image.url}`} alt="Founding Fathers" />
      </Hidden>
      <div className={classes.title}>
        <Typography className={classes.ends} variant="h3" gutterBottom>{content.IntroText.Line1}</Typography>
        <Typography className={classes.middle} variant="h2" gutterBottom>{content.IntroText.Line2}</Typography>
        <Typography className={classes.ends} variant="h3">{content.IntroText.Line3}</Typography>
      </div>
    </Box>
    );
}