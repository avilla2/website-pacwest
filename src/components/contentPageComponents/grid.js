import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "40px 10% 40px 10%",
    },
    image: {
       width: "95%",
    },
    caption: {
        fontFamily: "Inter, sans-serif",
        fontSize: "18px",
        fontWeight: "400",
        lineHeight: "28px",
    }
}));

export default function PictureGrid({ content }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    spacing={3}
                >
                    {content.Entry.map((entry, index) => {
                        return (
                            <Grid xs={6} sm={4} md={3} item key={index}>
                                <img className={classes.image} src={`${process.env.REACT_APP_BACKEND_URL}${entry.Picture.url}`} alt={entry.Picture.id} />
                                <ReactMarkdown className={classes.caption}>{entry.Caption}</ReactMarkdown>
                            </Grid>
                        )
                    })}
            </Grid>
        </div>
    );
}