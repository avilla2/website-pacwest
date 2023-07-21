import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "40px 10% 40px 10%",
    },
    btnmenu: {
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main + "!important",
        margin: "10px 10px 0px",
    },
    buttonRoot: {
        display: "inline",
    },
    links: {
        display: "block",
    },
}));

export default function Template({ content }) {
    const classes = useStyles();

    const isExternal = (text) => {
        if (text.charAt(0) === '/') {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.links}>
                <ButtonGroup
                            color="inherit"
                            aria-label=" primary button group"
                            size="large"
                            classes={{root: classes.buttonRoot}}
                        >
                    {content.Entry.map((entry, index) => {
                        return (
                            <Button key={index} component={isExternal(entry.Link) ? "a" : Link} href={entry.Link} to={entry.Link} className={classes.btnmenu}>
                                {entry.Text}
                            </Button>
                        )
                    })}
                </ButtonGroup>
            </div>
        </div>
    );
}