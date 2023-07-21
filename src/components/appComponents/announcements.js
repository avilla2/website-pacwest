import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px 0px',
        flexGrow: 1,
        
    },
    font: {
        fontFamily: "Inter, sans-serif",
    },
    title: {
        fontFamily: '"Poppins", sans-serif',
    },
}));

export default function Announcements({userData}) {
    const classes = useStyles();
    
    return (
        <Box className={classes.root}>
            <Typography className={classes.title} color='primary' variant='h5' component='h2'>
                Announcements
            </Typography>
            <Typography className={classes.title} color='secondary' variant='h4' component='h3'>
                {userData?.brother?.Name}
            </Typography>
        </Box>
    );
}