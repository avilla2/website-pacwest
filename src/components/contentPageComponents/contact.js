import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const classes = {
  root: {
    margin: '40px 5% 40px 5%'
  },
  input: {
    margin: '0px 5px 20px 5px'
  },
  inputSmall: {
    margin: '0px 5px 20px 5px'
  },
  error: (theme) => ({
    color: theme.palette.warning.main
  }),
  success: (theme) => ({
    color: theme.palette.success.main
  }),
  submit: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

export default function Contact ({ content }) {
  const [data, setData] = useState({
    first: '',
    last: '',
    email: '',
    body: ''
  })
  const [error, setError] = useState({
    first: false,
    last: false,
    email: false,
    body: false
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFormChange = (value, field) => {
    setData(state => ({ ...state, [field]: value }))
    handleErrorChange(field, false)
  }

  const handleErrorChange = (field, value) => {
    setError(state => ({ ...state, [field]: value }))
  }

  const clearForm = () => {
    setData({
      first: '',
      last: '',
      email: '',
      body: ''
    })
  }

  const sendEmail = async () => {
    const regex = /\w+@\w+\.[a-zA-Z]+/
    if (!data.first) {
      handleErrorChange('first', true)
    }
    if (!data.last) {
      handleErrorChange('last', true)
    }
    if (!data.body) {
      handleErrorChange('body', true)
    }

    if (regex.test(data.email)) {
      setLoading(true)
      fetch(`${process.env.REACT_APP_BACKEND_URL}/emails/create`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          First: data.first,
          Last: data.last,
          Email: data.email,
          Body: data.body,
          formName: content.Title
        })
      })
        .then(response => response.json())
        .then(createData => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/emails/send`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sender: content.sendTo,
              title: content.Title,
              first: data.first,
              last: data.last,
              email: data.email,
              body: data.body
            })
          })
            .then(response => response.json())
            .then(sendData => {
              if (sendData.message) {
                setStatus('success')
                setLoading(false)
                clearForm()
              } else if (sendData.error) {
                setStatus('failure')
                setLoading(false)
              }
            })
            .catch(() => {
              setStatus('failure')
              setLoading(false)
            })
        })
        .catch(() => {
          setStatus('failure')
          setLoading(false)
        })
    } else {
      handleErrorChange('email', true)
    }
  }

  return (
        <Box sx={classes.root}>
            <form style={classes.root} noValidate autoComplete="off">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={data.first}
                            error={error.first}
                            helperText={error.first ? 'First Name is Invalid' : ''}
                            onChange={event => { handleFormChange(event.target.value, 'first') }}
                            sx={classes.inputSmall}
                            id="first-name"
                            label="First Name"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={data.last}
                            error={error.last}
                            helperText={error.last ? 'Last Name is Invalid' : ''}
                            onChange={event => { handleFormChange(event.target.value, 'last') }}
                            sx={classes.inputSmall}
                            id="last-name"
                            label="Last Name"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            value={data.email}
                            error={error.email}
                            helperText={error.email ? 'Email is Invalid' : ''}
                            onChange={event => { handleFormChange(event.target.value, 'email') }}
                            sx={classes.input}
                            id="email"
                            label="Email"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            value={data.body}
                            error={error.body}
                            helperText={error.email ? "This Can't be Empty" : ''}
                            onChange={event => { handleFormChange(event.target.value, 'body') }}
                            sx={classes.input}
                            id="body"
                            label={content.bodyTitle}
                            fullWidth
                            required
                            multiline
                            rows={8}
                        />
                    </Grid>
                    <Grid item xs={12} sx={classes.submit}>
                        <Button disabled={loading} endIcon={<SendIcon />} variant="outlined" color="primary" onClick={sendEmail}>Submit</Button>
                    </Grid>
                </Grid>
                {status === 'success'
                  ? <Typography component="h5" sx={classes.success}>Thank you for reaching out, we will get back to you soon.</Typography>
                  : status === 'failure'
                    ? <Typography component="h5" sx={classes.error}>Could not send the message at this time. Try again later</Typography>
                    : null
                }
            </form>
        </Box>
  )
}
