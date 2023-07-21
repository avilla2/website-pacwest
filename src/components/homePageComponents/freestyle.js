import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "4% 3%"
    },
    body: {
        fontFamily: "Inter, sans-serif",
        padding: "0 5%",
        fontSize: "18px",
        fontWeight: "500",
        lineHeight: "24px",
    },
}));

export default function Freestyle({ content }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ReactMarkdown className={classes.body} rehypePlugins={[rehypeRaw]}>{content.Text}</ReactMarkdown>
        </div>
    );
}