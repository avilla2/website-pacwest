import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Grid from '@material-ui/core/Grid';
import GetIcon from '../utils/getIcon';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "50px 5% 0 5%",
        padding: "0 8px",
    },
    title: {
        color: "#2f2f2f",
        fontFamily: "Poppins, sans-serif",
        textAlign: "left",
        [theme.breakpoints.down('sm')]: {
            fontSize: "250%",
          },
    },
    subtitle: {
        color: theme.palette.primary.main,
        fontFamily: "Poppins, sans-serif",
        textAlign: "left",
        [theme.breakpoints.down('sm')]: {
            fontSize: "150%",
          },
    },
    values: {
        marginTop: "30px",
        fontFamily: "Poppins, sans-serif",
        [theme.breakpoints.down('sm')]: {
            fontSize: "200%",
          },
    },
    iconColor: {
        color: theme.palette.secondary.main,
        opacity: .2,
        fontSize: "20rem",
    },
    core: {
        position: "relative"
    },
    heading: {
        position: "absolute",
        top: "70px",
        fontSize: "1.2rem",
        fontFamily: "Inter, sans-serif",
    },
    desc: {
        margin: "0 17%",
    },
}));

export default function Mission({ content }) {
    const classes = useStyles();
    const scroller = React.useRef(null);
    const [scrollTarget, setScrollTarget] = React.useState(undefined) 
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        target: scrollTarget,
      });

    return (
        <div className={classes.root} ref={scroller} onLoad={() => {setScrollTarget(scroller.current);}}>
            <Typography className={classes.title} variant="h2" gutterBottom>
                {content.MainTitle}
            </Typography>
            <Typography className={classes.subtitle} variant="h4" gutterBottom>
                {content.Subtitle}
            </Typography>
            <Typography className={classes.values} variant="h3">
                {content.Header}
            </Typography>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {content.Entry.map((entry, index) => {
                        return (
                            <Grid key={index} item md={4} className={classes.core}>
                                <GetIcon iconName={entry.Icon} classes={classes.iconColor} />
                                <Fade in={trigger} {...(trigger ? { timeout: 1500 } : {})}>
                                    <Typography className={classes.heading} variant="subtitle1" gutterBottom>
                                        <ReactMarkdown className={classes.desc}>
                                            {entry.Text}
                                        </ReactMarkdown>
                                    </Typography>
                                </Fade>
                            </Grid>
                        )
                    })}
            </Grid>
        </div>
    );
}