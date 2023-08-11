import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const styles = {
  base: (theme) => ({
    [theme.breakpoints.down('xl')]: {
      position: "relative",
    },
  }),
  video: {
    width: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    textAlign: "left",
    fontFamily: '"Poppins", sans-serif',
  },
  ends: (theme) =>  ({
    fontFamily: '"Poppins", sans-serif',
    color: "white",
    textShadow: "3px 3px 20px #2f2f2f",
    [theme.breakpoints.up('md')]: {
      fontSize: "275%",
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: "150%",
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: "200%",
    },
  }),
  middle: (theme) => ({
    fontFamily: '"Poppins", sans-serif',
    color: "#872",
    textShadow: "2px 2px 7px #2f2f2f",
    [theme.breakpoints.up('md')]: {
      fontSize: "275%",
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: "150%",
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: "200%",
    },
  })
};

export default function Intro({ content }) {
  //let theme = createTheme();
  const hidden = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return (
    <Box sx={styles.base} component="div">
      {hidden ? 
        <video style={styles.video} loop autoPlay muted>
          <source src={`${process.env.REACT_APP_BACKEND_URL}${content.Video.url}`} type="video/mp4" />
        </video>
    
      :
        <img style={styles.root} src={`${process.env.REACT_APP_BACKEND_URL}${content.Image.url}`} alt="Founding Fathers" />
      }                       
      <Box sx={styles.overlay}>
        <Typography sx={styles.ends} variant="h3" gutterBottom>{content.IntroText.Line1}</Typography>
        <Typography sx={styles.middle} variant="h2" gutterBottom>{content.IntroText.Line2}</Typography>
        <Typography sx={styles.ends} variant="h3">{content.IntroText.Line3}</Typography>
      </Box>
    </Box>
  );
}