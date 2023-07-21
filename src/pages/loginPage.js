import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import BetaIcon from '../images/betaicon.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import GetIcon from '../components/utils/getIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0px 10px',
    },
    logo: {
        width: '100px',
        margin: "20px 0"
    },
    title: {
        fontFamily: "Inter, sans-serif",
        letterSpacing: 2,
    },
    content: {
        marginTop: '60px',
    },
    prompt: {
        padding: ' 2% 4%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
          },
        [theme.breakpoints.between('md', 'md')]: {
            maxWidth: "550px",
          },
        [theme.breakpoints.up('lg')]: {
            maxWidth: "550px",
          },
    },
    input: {
        display: 'block',
        margin: '15px 0'
    },
    helpText: {
        fontFamily: "Inter, sans-serif",
        textAlign: 'right',
        margin: '0 0 20px 0',
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    newAccountText: {
        fontFamily: "Inter, sans-serif",
        textAlign: 'center',
        margin: '0 0 20px 0',
        color: '#2f2f2f',
    },
    helpLink: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    login: {
        width: '70%',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        margin: '0 0 20px 0',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    bottom: {
        display: 'flex',
        maxWidth: '620px',
        margin: '0 auto',
    },
    back: {
        width: 'unset',
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
        margin: '20px 0 20px 0',
        '&:hover': {
            backgroundColor: theme.palette.warning.light,
            color: 'white',
        },
    },
}));

export default function LoginPage({setPage, setToken}) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();
    useEffect(() => {
        setPage("Login");
    });

      const loginRequest = () => {
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/local`, {
            identifier: username,
            password: password,
        })
        .then(response => {
            // Handle success.
            setToken(response.data.jwt)
            window.localStorage.setItem('user', response.data.jwt)
            window.localStorage.setItem('user-id', response.data.user.id)
            console.log(response.data.user)
            history.push('/app/home');
        })
        .catch(error => {
            // Handle error.
            setError(true)
        });
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className={classes.content}
            >
                <Grid item xs={12}>
                    <img className={classes.logo} src={BetaIcon} alt='Beta Theta Pi Icon' />
                    <Typography variant='h5' color='primary' className={classes.title}>Sign in to BetaRhoOnline</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Paper elevation={6} className={classes.prompt}>
                            <TextField error={error} value={username} onChange={(event) => { setUsername(event.target.value); setError(false)}} className={classes.input} fullWidth variant="outlined" label="Email" />
                            <TextField error={error} helperText={error ? 'Username or Password is Incorrect' : null} value={password} onChange={(event) => { setPassword(event.target.value); setError(false)}} className={classes.input} fullWidth variant="outlined" label="Password" type="password"/>
                            <Typography variant='body2' className={classes.helpText}>
                                <Link className={classes.helpLink} to='/app/forgot-password'>Forgot Password?</Link>
                            </Typography>
                            <Button onClick={loginRequest} className={classes.login} variant='contained'>Sign In</Button>
                            <Typography variant='body1' className={classes.newAccountText}>
                                New to Beta Rho? <Link className={classes.helpLink} to='/app/create-account'>Create an Account</Link>
                            </Typography>
                    </Paper>
                    <div className={classes.bottom}>
                        <Button component={Link} to='/' startIcon={<GetIcon iconName='ArrowBack' />} className={classes.back} variant='outlined'>Return to Home</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}