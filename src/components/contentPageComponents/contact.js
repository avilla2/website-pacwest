import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "40px 5% 40px 5%",
    },
    input: {
        margin: "0px 5px 20px 5px",
    },
    inputSmall: {
        margin: "0px 5px 20px 5px",
    },
    error: {
        color: theme.palette.warning.main,
    },
    success: {
        color: "#4caf50",
    }
}));

export default function Contact({ content }) {
    const classes = useStyles();
    const [data, setData] = useState({
        "first": "",
        "last": "",
        "email": "",
        "body": "",
    });
    const [error, setError] = useState({
        "first": false,
        "last": false,
        "email": false,
        "body": false,
    });
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFormChange = (value, field) => {
        setData(state => ({ ...state, [field]: value }));
        handleErrorChange(field, false);
    };

    const handleErrorChange = (field, value) => {
        setError(state => ({ ...state, [field]: value }));
    };

    const clearForm = () => {
        setData({
            "first": "",
            "last": "",
            "email": "",
            "body": "",
        })
    }

    const sendEmail = async () => {
        let regex = /\w+@\w+\.[a-zA-Z]+/;
        if (!data.first) {
            handleErrorChange("first", true);
        }
        if (!data.last) {
            handleErrorChange("last", true);    
        }
        if (!data.body) {
            handleErrorChange("body", true);
        }

        if (regex.test(data.email)) {
            setLoading(true);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/emails/create`, {
                method: 'POST', // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "First": data.first,
                    "Last": data.last,
                    "Email": data.email,
                    "Body": data.body,
                    "formName": content.Title,
                })
            })
            .then(response => response.json())
            .then(createData => {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/emails/send`, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "sender": content.sendTo,
                        "title": content.Title,
                        "first": data.first,
                        "last": data.last,
                        "email": data.email,
                        "body": data.body,
                    })
                })
                .then(response => response.json())
                .then(sendData => {
                    if (sendData.message) {
                        setStatus("success");
                        setLoading(false);
                        clearForm();
                    } else if (sendData.error) {
                        setStatus("failure");
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setStatus("failure");
                    setLoading(false);
                });
            })
            .catch((error) => {
                setStatus("failure");
                setLoading(false);
            });
            
            
        } else {
            handleErrorChange("email", true);

        }
    }
 
    return (
        <div className={classes.root}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item md={6}  xs={12}>
                        <TextField value={data.first} error={error.first} helperText={error.first? "First Name is Invalid" : ""} onChange={event => {handleFormChange(event.target.value, "first")}} className={classes.inputSmall} id="first-name" label="First Name" fullWidth required/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField value={data.last} error={error.last} helperText={error.last? "Last Name is Invalid" : ""} onChange={event => {handleFormChange(event.target.value, "last")}} className={classes.inputSmall} id="last-name" label="Last Name" fullWidth required/>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField value={data.email} error={error.email} helperText={error.email? "Email is Invalid" : ""} onChange={event => {handleFormChange(event.target.value, "email")}} className={classes.input} id="email" label="Email" fullWidth required/>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField value={data.body} error={error.body} helperText={error.email? "This Can't be Empty" : ""} onChange={event => {handleFormChange(event.target.value, "body")}} className={classes.input} id="body" label={content.bodyTitle} fullWidth required multiline rows={8}/>
                    </Grid>
                    <Grid item size="large">
                        <Button disabled={loading} endIcon={<SendIcon />} className={classes.submit} variant="outlined" color="primary" onClick={sendEmail}>Submit</Button>
                    </Grid>
                </Grid>
                {status === "success" ?
                    <h5 className={classes.success}>Thank you for reaching out, we will get back to you soon.</h5>
                : status === "failure" ?
                    <h5 className={classes.failure}>Could not send the message at this time. Try again later</h5>
                : null
                }               
            </form>
        </div>
    );
}