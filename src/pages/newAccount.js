import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import BetaIcon from '../images/betaicon.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import GetIcon from '../components/utils/getIcon';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0px 20px',
    },
    logo: {
        width: '60px',
        margin: "10px 0px",
    },
    title: {
        fontFamily: "Inter, sans-serif",
        letterSpacing: 2,
    },
    content: {
        marginTop: '10px',
    },
    prompt: {
        padding: ' 2% 4%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.between('md', 'lg')]: {
            maxWidth: "1000px",
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
    buttons: {
        display: 'flex', 
        flexDirection: 'row', 
        paddingTop: '15px',
    },
    bottom: {
        display: 'flex',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    check: {
        width: '50%',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        margin: '0 0 20px 0',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
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
    spacer: {
        flex: '1 1 auto', 
    },
    errormsg: {
        flex: '1 1 auto', 
        paddingTop: '5px',
        color: theme.palette.warning.main,
    },
    red: {
        color: theme.palette.warning.main,
    },
    stepper: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'baseline',
          },
    },
    stepItem: {
        [theme.breakpoints.down('xs')]: {
            padding: '5px 0px',
            textAlign: 'left',
          },
    }
}));

export default function LoginPage({setPage, setToken}) {
    const classes = useStyles();
    //const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [roleNum, setRoleNum] = useState('');
    const [uoid, setUoid] = useState('');
    const [user, setUser] = useState();
    const [error, setError] = useState({
        username: null,
        email: null,
        pass1: null,
        pass2: null,
        brother: null,
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['New Account Information', 'Link to Brother Info', 'Finish'];

    useEffect(() => {
        setPage("New Account");
    });

    const handleNext = async () => {
        if (activeStep === 0){
            let valid_entry = true;
            let regex = /\w+@\w+\.[a-zA-Z]+/;
            if (!regex.test(email)) {
                setError(prevError => ({...prevError, email: 'Email is not valid'}))
                valid_entry = false;
            }
            if (password !== passConfirm) {
                setError(prevError => ({...prevError, pass2: 'Passwords do not match'}))
                valid_entry = false;
            }
            if (!username) {
                setError(prevError => ({...prevError, username: 'Username is Required'}))
                valid_entry = false;
            }
            if (!email) {
                setError(prevError => ({...prevError, email: 'Email is Required'}))
                valid_entry = false;
            }
            if (!password) {
                setError(prevError => ({...prevError, pass1: 'Password is Required'}))
                valid_entry = false;
            }
            if (valid_entry) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        else if (activeStep === 1) {
            let valid_new = await registerUser();
            if (valid_new) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    
    const registerUser = () => {
        return axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/local/register`, {
            username: username,
            email: email,
            password: password,
            brother: user?.id
        })
        .then(response => {
            setError(prevError => ({...prevError, brother: null}))
            return response.data.user;
        })
        .catch(error => {
            // Handle error.
            setError(prevError => ({...prevError, brother: 'Account could not be created. Check the info you entered'}))
            return null;
        });
    }
    
    const searchBrother = () => {
        return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/brothers?RoleNumber=${roleNum}&UOID=${uoid}`)
        .then(response => {
            // Handle success.
            let info = response.data.length !== 0? response.data[0] : 'error';
            setUser(info);
            return info
        })
        .catch(error => {
            // Handle error.
            setUser('error')
            return null
        });
    }

    const BrotherInfo = () => {
        return (
            <>
                <Grid item xs={12} md={6}>
                    <TextField value={roleNum} onChange={(event) => { setRoleNum(event.target.value); setUser(null)}} 
                        className={classes.input} fullWidth label="Role Number" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField value={uoid} onChange={(event) => { setUoid(event.target.value); setUser(null)}} 
                        className={classes.input} fullWidth label="UOID" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button onClick={() => searchBrother()} className={classes.check} variant='contained'>Verify</Button>
                </Grid>
                {user === 'error' ? 
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Error Finding Brother</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody color='primary'>
                                <TableRow>
                                    <TableCell className={classes.red} component="th" scope="row">
                                        Registered Beta Rho brother with ID '{uoid}' not found
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : user ? 
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Role Number</TableCell>
                                        <TableCell align="right">UOID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody color='primary'>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {user?.Name}
                                        </TableCell>
                                        <TableCell align="right">{user?.RoleNumber}</TableCell>
                                        <TableCell align="right">{user?.UOID}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : <></>
                }
            </>
        )
    }

    const AccountInfo = () => {
        return (
            <>
                <Grid item xs={12} md={6}>
                    <TextField key={3} error={error.username} value={username} helperText={error.username}
                        onChange={ (event) => { setUsername(event.target.value); setError( prevError => ({...prevError, username: null}) ) } } 
                        className={classes.input} fullWidth label="Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField error={error.email} value={email} helperText={error.email}  
                        onChange={ (event) => { setEmail(event.target.value); setError( prevError => ({...prevError, email: null}) ) } } 
                        className={classes.input} fullWidth label="Email" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField error={error.pass1} helperText={error.pass1} value={password} type='password'
                        onChange={(event) => { setPassword(event.target.value); setError( prevError => ({...prevError, pass1: null}) ) } } 
                        className={classes.input} fullWidth label="Password"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField error={error.pass2} helperText={error.pass2} value={passConfirm} type='password'
                        onChange={(event) => { setPassConfirm(event.target.value); setError( prevError => ({...prevError, pass2: null}) ) } } 
                        className={classes.input} fullWidth label="Confirm Password"/>
                </Grid>
            </>
        )
    }
    
    const SuccessPage = () => {
        return (
            <>
                <Grid item xs={12} md={6}>
                    <Typography color='secondary' variant='subtitle1' >Account Created Successfully, Welcome to the club Brother {user.Name}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button component={Link} className={classes.check} to='/app/login' variant='contained'>Login</Button>
                </Grid>
            </>
        )
    }

    const BodyView = () => {
        switch(activeStep) {
            case 0:
                return AccountInfo();
            case 1:
                return BrotherInfo();
            case 2:
                return SuccessPage();
            default:
                return <h2>Error: Page Content Not Found</h2>;
          }
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
                <Grid item xs={8}>
                    <img className={classes.logo} src={BetaIcon} alt='Beta Theta Pi Icon' />
                    <Typography variant='h6' color='primary' className={classes.title}>Create New Account</Typography>
                    <Stepper className={classes.stepper} activeStep={activeStep}>
                        {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps} className={classes.stepItem}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                        })}
                    </Stepper>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Paper elevation={6} className={classes.prompt}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            className={classes.content}
                        >
                            <Grid item xs={12} md={12}>
                                <Typography color='primary'>{steps[activeStep]}</Typography>
                            </Grid>
                            {BodyView()}
                            <Grid item xs={12} md={12}>
                                {activeStep !== 2 ? 
                                    <Box className={classes.buttons}>
                                        <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        >
                                            Back
                                        </Button>
                                        { error.brother ? <Typography className={classes.errormsg} variant='subtitle2' >{error.brother}</Typography> : <Box className={classes.spacer} /> }
                                        <Button onClick={handleNext}>
                                            Next
                                        </Button>
                                    </Box>
                                : <></> }
                            </Grid>
                        </Grid>
                    </Paper>
                    <div className={classes.bottom}>
                        <Button component={Link} to='/app/login' startIcon={<GetIcon iconName='ArrowBack' />} className={classes.back} variant='outlined'>Already have an Account? Sign In</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}