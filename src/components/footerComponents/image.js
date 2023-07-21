import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0px",
    },
    image: {
        width: 200,
    },
}));

export default function Template({ content }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img className={classes.image} src={`${process.env.REACT_APP_BACKEND_URL}${content.Image.url}`} alt={content.Image.name} />
        </div>
    );
}