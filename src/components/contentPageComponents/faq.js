import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'

const classes = {
  root: {
    margin: '40px 0px'
  },
  accordion: {
    margin: '0 10%'
  },
  borders: (theme) => ({
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main
  })
}

export default function Faq ({ content }) {
  return (
        <Box sx={classes.root}>
                <Box sx={classes.accordion}>
                    {content.Entry.map((entry, index) => {
                      return (
                            <Accordion key={index} sx={classes.borders}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id={`accordian-${content.id}-${index}`}
                                >
                                    <Typography>{entry.Title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {entry.Body}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                      )
                    })}
                </Box>
        </Box>
  )
}
