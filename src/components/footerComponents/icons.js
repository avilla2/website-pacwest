import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GetIcon from '../utils/getIcon';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0px",
    },
    Blue: {
        color: theme.palette.primary.main,
    },
    Red: {
        color: theme.palette.warning.main,
    },
    Green: {
        color: theme.palette.success.main,
    },
    Gold: {
        color: theme.palette.secondary.main,
    },
}));

export default function Icons({ content }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span>
                {content.Entry.map((item, key) => {
                    return (
                        <IconButton key={key} component={Link} href={item.Link}>
                            <GetIcon iconName={item.Icon} classes={classes[item.Color]} fontSize="large" />
                        </IconButton>
                    )
                })}
            </span>
        </div>
    );
}