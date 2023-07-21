import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      imageList: {
        width: "100%",
        flexWrap: "nowrap",
        [theme.breakpoints.up('xl')]: {
            maxHeight: 1400,
          },
        [theme.breakpoints.between('lg','lg')]: {
            maxHeight: 1000,
          },
        [theme.breakpoints.between('sm','md')]: {
            maxHeight: 700,
        },
        [theme.breakpoints.down('xs')]: {
            maxHeight: 400,
        },
      },
}));

export default function Gallery({ content }) {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <div className={classes.gallery}>
          <ImageList rowHeight="auto" className={classes.imageList} cols={2}>
              {content.Pictures.map((item) => (
              <ImageListItem key={item.id} cols={item.width >= 800 ? 2 : 1}>
                  <img src={`${process.env.REACT_APP_BACKEND_URL}${item.url}`} alt={item.id} />
              </ImageListItem>
              ))}
          </ImageList>
        </div>
    </div>
    );
}