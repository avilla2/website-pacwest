import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GeneratePageContent from '../utils/generatePageContent';
import Button from '@material-ui/core/Button';
import GetIcon from '../utils/getIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        flexGrow: 2,
    },
    base: {
        backgroundColor: theme.palette.warning.main,
        width: "100%",
        height: "22vh",
        minHeight: "120px",
        maxHeight: "325px",
        position: 'relative',
        marginBottom: '7%',
    },
    title: {
        position: 'absolute',
        color: 'white',
        bottom: 30,
        left: 0,
        right: 0,
        [theme.breakpoints.down('xs')]: {
            bottom: 5,
            left: 0,
            right: 0,
        },
    },
    back: {
        position: 'absolute',
        left: 15,
        width: 'unset',
        color: 'white',
        borderColor: 'white',
        margin: '20px 0 20px 0',
        '&:hover': {
            backgroundColor: 'white',
            color: theme.palette.secondary.light,
        },
    },
}));

export default function ResourceSection({setPageContent, title, content}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.base} square>
                <Button onClick={() => setPageContent(null)} startIcon={<GetIcon iconName='ArrowBack' />} className={classes.back} variant='outlined'>Back</Button>
                <h1 className={classes.title}>{title}</h1>
            </Paper>
            <div className={classes.page}>
                {content.map((item, index) => {
                    return (
                        <GeneratePageContent key={index} content={item}/>
                    );
                })}
            </div>
        </div>
    );
}