import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "20px auto 0 auto",
        position: "relative",
        [theme.breakpoints.between('xs', 'xs')]: {
            maxWidth: '350px',
            minHeight: '475px',
          },
        [theme.breakpoints.between('sm', 'md')]: {
            maxWidth: "620px",
            minHeight: "850px",
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            maxWidth: "1200px",
            minHeight: "1600px",
        },
    },
    doc: {
        width: "100%",
    },
    page: {
        '& canvas': {
            margin: '0 auto',
            [theme.breakpoints.between('xs', 'xs')]: {
                width: '300px !important',
                height: '400px !important',
              },
            [theme.breakpoints.between('sm', 'md')]: {
                width: '580px !important',
                height: '790px !important',
            },
            [theme.breakpoints.between('lg', 'xl')]: {
                width: '1100px !important',
                height: '1500px !important',
            },
        },
    },
    navbar: {
        display: "flex",
        position: 'absolute',
        bottom: "20px",
        right: 0,
        left: 0,
        justifyContent: "center",
    },
    nav: {
        display: "flex",
        maxWidth: 200,
        width: "100%",
        justifyContent: "center",
    },
    navtext: {
        fontFamily: "Inter, sans-serif",
    },
}))

export default function PDF({ src }) {
    const classes = useStyles();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [hover, setHover] = useState(false);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
      }
    return (
        <Card elevation={6} className={classes.root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            <CardContent>
                <Document
                    file={`${process.env.REACT_APP_BACKEND_URL}${src}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className={classes.doc}
                >
                    <Page className={classes.page} pageNumber={pageNumber || 1} />
                </Document>
                {hover ? 
                    <div className={classes.navbar}>
                        <Fade in={hover} timeout={700}>
                            <Card elevation={8} className={classes.nav}>
                                <IconButton
                                    disabled={pageNumber <= 1}
                                    onClick={previousPage}
                                >
                                    <ArrowBackIosIcon />
                                </IconButton>
                                <p className={classes.navtext}>Page {pageNumber} of {numPages}</p>
                                <IconButton 
                                    disabled={pageNumber >= numPages}
                                    onClick={nextPage}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Card>
                        </Fade>
                    </div>
                    
                :
                    null
                }
        </CardContent>
        </Card>
    );
}