import React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

const classes = {
  root: (theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  }),
  imageList: (theme) => ({
    width: '100%',
    flexWrap: 'nowrap',
    [theme.breakpoints.up('xl')]: {
      maxHeight: 1400
    },
    [theme.breakpoints.between('lg', 'lg')]: {
      maxHeight: 1000
    },
    [theme.breakpoints.between('sm', 'md')]: {
      maxHeight: 700
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: 400
    }
  })
}

export default function Gallery ({ content }) {
  return (
    <Box sx={classes.root}>
        <ImageList sx={classes.imageList} variant="masonry" cols={3} gap={8}>
            {content.Pictures.map((item, index) => (
            <ImageListItem key={index}>
                <img src={`${process.env.REACT_APP_BACKEND_URL}${item.data.attributes.url}`} alt={item.id} />
            </ImageListItem>
            ))}
        </ImageList>
    </Box>
  )
}
