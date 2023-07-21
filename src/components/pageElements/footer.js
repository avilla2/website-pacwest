import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import GenerateFooterContent from '../utils/generateFooterContent';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "50px 20px",
        marginTop: "50px",
    },
}));

export default function Footer({ content }) {
    const classes = useStyles();
    return (
        <Box className={classes.root} bgcolor="info.main" component="div">
           <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
            >
                {content.map((item, key) => {
                    return (
                        <Grid item key={key} md={item.Space}>
                            <GenerateFooterContent content={item} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}