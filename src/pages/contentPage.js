import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Hidden } from '@material-ui/core';
import GeneratePageContent from '../components/utils/generatePageContent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        flexGrow: 2,
    },
    base: {
        backgroundColor: theme.palette.warning.main,
        width: "100%",
        height: "29vh",
        minHeight: "225px",
        maxHeight: "325px",
        position: "fixed",
        zIndex: -99,
    },
    title: {
        position: 'absolute',
        color: 'white',
        bottom: 30,
        left: 0,
        right: 0,
    },
    page: {
        [theme.breakpoints.up('md')]: {
            marginTop: '255px',
            backgroundColor: 'white',
            paddingTop: '5px',
        },
    },
}));

export default function ContentPage({setPage, name, content}) {
    const classes = useStyles();
    useEffect(() => {
        setPage(name);
      });
    return (
        <div className={classes.root}>
            <Hidden smDown>
                <Paper elevation={0} className={classes.base} square>
                    <h1 className={classes.title}>{name}</h1>
                </Paper>
            </Hidden>
            <div className={classes.page}>
                {content.map((item, index) => {
                    return (
                        <GeneratePageContent key={index} content={item}/>
                    );
                })}
            </div>
        </div>
    );
}