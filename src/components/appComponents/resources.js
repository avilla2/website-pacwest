import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Query from "../utils/query";
import RESOURCE_PAGE_QUERY from "../../queries/resourcePageQuery";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import GetIcon from '../utils/getIcon';
import ResourceSection from './resourceSection';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px 0px',
        flexGrow: 1,
        padding: '0 2% 28% 2%'
    },
    font: {
        fontFamily: "Inter, sans-serif",
    },
    title: {
        fontFamily: '"Poppins", sans-serif',
    },
    button: {
        display: 'block',
        width: '98%'
    },
    cardBox: {
        marginTop: "2%",
    },
    card: {
        margin: "0 auto",
        backgroundColor: theme.palette.common.white,
        padding: "2%",
        position: "relative",
    },
    header: {
        color: "black",
        fontFamily: "Inter, sans-serif",
        display: 'flex',
    },
    icon: {
        padding: '0 4%',
        marginTop: '5px',
    },
    desc: {
        fontFamily: "Inter, sans-serif",
        color: "black",
        lineHeight: 1.5,
    },
    cardImage: {
        maxWidth: 80,
        width: '95%',
        margin: 'auto'
    },
    cardImageBox: {
        display: 'contents',
    },
}));

export default function Resources({userData}) {
    const classes = useStyles();
    const [pageContent, setPageContent] = useState(null);
    const [pageTitle, setPageTitle] = useState("Resources")

    const LinkTile = ({info}) => {
        return (
                <ButtonBase className={classes.button} href={info.Thumbnail.External ? info.Thumbnail.Link : null}>
                    <Card elevation={6} className={classes.card}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={0}
                        >        
                            <Grid xs={info.Thumbnail.Image ? 9: 12} item>
                                <CardContent>
                                    <Typography className={classes.header} variant="h5" component="h4" align="left" gutterBottom>
                                        <span>{info.Title}</span>
                                        {info.Thumbnail.External ? 
                                            <GetIcon iconName='Launch' classes={classes.icon}/>
                                            : <></>
                                        }
                                    </Typography>
                                    <Typography className={classes.desc} variant="body1" align="left" component="div">
                                        {info.Thumbnail.Description}  
                                    </Typography>
                                </CardContent>
                            </Grid> 
                            {info.Thumbnail.Image ? 
                                <Grid xs={3} item className={classes.cardImageBox}>
                                    <CardMedia
                                        component="img"
                                        image={`${process.env.REACT_APP_BACKEND_URL}${info.Thumbnail.Image.url}`}
                                        alt={info.Thumbnail.Image.name}
                                        className={classes.cardImage}
                                    />
                                </Grid>
                                : <></>
                            }            
                        </Grid>
                    </Card>
                </ButtonBase>
        )
    }
    
    const ResourceTile = ({info}) => {
        return (
                <ButtonBase className={classes.button} onClick={() => { setPageContent(info.Content); setPageTitle(info.Title) }}>
                    <Card elevation={6} className={classes.card}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={0}
                        >        
                            <Grid xs={info.Thumbnail.Image ? 9: 12} item>
                                <CardContent>
                                    <Typography className={classes.header} variant="h5" component="h4" align="left" gutterBottom>
                                        <span>{info.Title}</span>
                                        {info.Thumbnail.External ? 
                                            <GetIcon iconName='Launch' classes={classes.icon}/>
                                            : <></>
                                        }
                                    </Typography>
                                    <Typography className={classes.desc} variant="body1" align="left" component="div">
                                        {info.Thumbnail.Description}  
                                    </Typography>
                                </CardContent>
                            </Grid> 
                            {info.Thumbnail.Image ? 
                                <Grid xs={3} item className={classes.cardImageBox}>
                                    <CardMedia
                                        component="img"
                                        image={`${process.env.REACT_APP_BACKEND_URL}${info.Thumbnail.Image.url}`}
                                        alt={info.Thumbnail.Image.name}
                                        className={classes.cardImage}
                                    />
                                </Grid>
                                : <></>
                            }            
                        </Grid>
                    </Card>
                </ButtonBase>
        )
    }

    const Tiles = () => {
        return (
            <Box className={classes.root}>
                <Typography className={classes.title} color='primary' variant='h5' component='h2'>
                    Resources
                </Typography>
                <Typography className={classes.title} color='secondary' variant='h4' component='h3'>
                    {userData?.brother?.Name}
                </Typography>
                <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                        className={classes.cardBox}
                    >
                        <Query query={RESOURCE_PAGE_QUERY}>
                        {({ data: { resources } }) => {
                            return (
                                <>
                                    {resources.map((item, index) => (
                                        <>
                                        {item.Thumbnail.External ? 
                                            <Grid style={{height: '100%'}} xs={12} sm={12} md={6} item key={index}>
                                                <LinkTile info={item} />
                                            </Grid>
                                        : 
                                            <Grid style={{height: '100%'}} xs={12} sm={12} md={6} item key={index}>
                                                <ResourceTile info={item} />
                                            </Grid>
                                        }
                                        </>
                                    ))}
                                </>
                            )
                        }}
                    </Query> 
                </Grid>
            </Box>
        );
    }

    const renderComponent = () => {
        switch(pageContent) {
            case null:
                return <Tiles />;
            default:
                return <ResourceSection setPageContent={setPageContent} content={pageContent} title={pageTitle} />;
          }
    }

    return (
        <>
            {renderComponent()}
        </>
    );
}