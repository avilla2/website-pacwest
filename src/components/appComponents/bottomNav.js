import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GetIcon from '../utils/getIcon';

const useStyles = makeStyles((theme) => ({
    nav: { 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,     
        paddingBottom: '30px',
        paddingTop: '5px',
    },
    font: {
        fontFamily: "Inter, sans-serif",
    },
}));

export default function ContentPage({setValue, value}) {
    const classes = useStyles();

    return (
        <Paper className={classes.nav} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            >
                <BottomNavigationAction className={classes.font} label="Dashboard" icon={<GetIcon iconName="Dashboard" />} />
                <BottomNavigationAction label="Resources" icon={<GetIcon iconName="Folder" />} />
                <BottomNavigationAction label="Messages" icon={<GetIcon iconName="SpeakerNotes" />} />
            </BottomNavigation>
        </Paper>
    );
}