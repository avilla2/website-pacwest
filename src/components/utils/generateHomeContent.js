import React from 'react';
import { makeStyles } from '@mui/styles';
import renderComponent from './renderPageComponent';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    head: {
        fontFamily: '"Poppins", "sans-serif"',
        margin: '5% 0% 2% 0%'
    },
}));

export default function GeneratePageContent(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                props.content.__typename !== 'ComponentHomePageComponentsIntro' ? 
                    <Typography className={classes.head} variant="h2" gutterBottom> {props?.content?.Title}</Typography> 
                : <></> 
            }
            {renderComponent(props.content)}
        </div>
    );
}