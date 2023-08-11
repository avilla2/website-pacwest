import React from 'react';
import { makeStyles } from '@mui/styles';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0px"
    },
    body: {
        fontFamily: "Inter, sans-serif",
        padding: "0 5%",
        fontSize: ".95rem",
        fontWeight: "500",
        lineHeight: "24px",
        textAlign: 'center'
    },
}));

export default function Paragraph({ content }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ReactMarkdown className={classes.body}>{content.Text}</ReactMarkdown>
        </div>
    );
}