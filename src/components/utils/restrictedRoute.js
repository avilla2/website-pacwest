import React, { useEffect } from 'react';
import { Route, useHistory } from "react-router-dom";
import axios from 'axios';

const loggedIn = (token) => {
    let newToken = !window.localStorage.getItem('user') ? token : window.localStorage.getItem('user');
    let userID = window.localStorage.getItem('user-id')
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      })
      .then(response => {
        // Handle success.
        return(true)
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
        return(false)
      });
  }

export default function RestrictedRoute({token, path, children, valid, setValid, setUserData}) {
    const history = useHistory()
    useEffect(() => {
        async function getLoginStatus() {
            await loggedIn(token) ? setValid(true) : history.replace('/app/login');
        }
        getLoginStatus()
      }, [valid, token, setValid, history]);
    return (
        <>
            {valid ? 
                <Route path={path}>
                    {children}
                </Route>
                :
                null
            }
        </>
    )
}