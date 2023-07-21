import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import betalogo from '../../images/betalogo2.png';
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    nav: {
        color: theme.palette.primary.main,
        backgroundColor: 'white',
    },
    mobileLogo: {
      width: "2.2rem",
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
    },
    logout: {
        color: theme.palette.warning.main,
    },
}));


export default function ButtonAppBar() {
    const classes = useStyles();
    const history = useHistory();

    const logout = () => {
        window.localStorage.clear('user');
        window.localStorage.clear('user-id');
        history.replace('/app/login')
    }

    return (
        <Box className={classes.root}>
            <AppBar className={classes.nav} position="static">
                <Toolbar>
                <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    component={Link}
                    to='/'
                >
                    <img className={classes.mobileLogo} src={betalogo} alt='Beta Logo' />
                </IconButton>
                <Typography variant="h6" component="div" className={classes.title}>
                    Wooglins Badussy
                </Typography>
                <Button onClick={logout} className={classes.logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}