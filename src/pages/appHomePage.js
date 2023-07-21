import React, { useEffect, useState } from 'react';
import BottomNav from '../components/appComponents/bottomNav';
import TopNav from '../components/appComponents/topNav';
import Dashboard from '../components/appComponents/dashboard';
import Resources from '../components/appComponents/resources';
import Announcements from '../components/appComponents/announcements';
import axios from 'axios';


const getUserData = () => {
    let newToken = window.localStorage.getItem('user');
    let userID = window.localStorage.getItem('user-id');
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      })
      .then(response => {
        // Handle success.
        return(response.data)
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
}

export default function AppHomePage({setPage}) {
    const [value, setValue] = useState(0);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        let mounted = true;
        setPage("App Home");
        getUserData()
        .then(data => {
            if (mounted) {
                setUserData(data)
            }
        });
        return () => { mounted = false }
    }, [setPage]);
    
    const BodyView = () => {
        switch(value) {
            case 0:
                return <Dashboard userData={userData} />;
            case 1:
                return <Resources userData={userData} />;
            case 2:
                return <Announcements userData={userData} />;
            default:
                return <h2>Error: Page Content Not Found</h2>;
          }
    }

    return (
        <>
            <TopNav />
            <BodyView />
            <BottomNav value={value} setValue={setValue} />
        </>
    );
}