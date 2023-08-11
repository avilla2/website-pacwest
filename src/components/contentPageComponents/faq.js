import React from 'react';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "40px 0px",
    },
    accordion: {
        margin: "0 10%"
    },
    heading: {
        fontFamily: "Inter, sans-serif",
    },
    description: {
        fontFamily: "Inter, sans-serif",
    }
}));

export default function Faq({ content }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <div className={classes.accordion}>
                    {content.Entry.map((entry, index) => {
                        return (
                            <Accordion key={index}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id={`accordian-${content.id}-${index}`}
                                >
                                    <Typography className={classes.heading}>{entry.Title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className={classes.description}>
                                        {entry.Body}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </div>
        </div>
    );
}