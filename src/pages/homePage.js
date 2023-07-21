import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GenerateHomeContent from '../components/utils/generateHomeContent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    }
}));

export default function ContentPage({setPage, content, pageName}) {
    const classes = useStyles();
    useEffect(() => {
        setPage(pageName);
      });
    return (
        <div className={classes.root}>
            {content.map((item, index) => {
                return (
                    <GenerateHomeContent key={index} content={item}/>
                );
            })}
        </div>
    );
}