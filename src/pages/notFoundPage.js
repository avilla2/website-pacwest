import React, {useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    returnButton: {
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
    },
}));

export default function ContentPage({ setPage }) {
    const classes = useStyles();
    useEffect(() => {
        setPage("Beta Theta Pi");
      });
    return (
        <div className={classes.root}>
            <h1>Looks Like your Lost...</h1>
            <h2>This Page is Not Available</h2>
            <Button variant="outlined" size="large" component={Link} to="/" className={classes.returnButton}>
                Return Home
            </Button>
        </div>
    );
}