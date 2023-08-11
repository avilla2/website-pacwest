import React from 'react';
import { makeStyles } from '@mui/styles';
import renderComponent from './renderPageComponent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    title: {
        fontFamily: "Inter, sans-serif",
        letterSpacing: 4,
        margin: "2% 10%",
        color: theme.palette.primary.main,
    },
}));

export default function GeneratePageContent(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>{props.content?.Title}</h2>
            {renderComponent(props.content)}
        </div>
    );
}