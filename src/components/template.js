import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "40px 0px 40px 0px",
    },

}));

export default function Template({ content }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>

        </div>
    );
}