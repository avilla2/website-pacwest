import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/pageElements/navbar'
import Footer from './components/pageElements/footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import APP_QUERY from './queries/appQuery'
import Query from './components/utils/query'
import ContentPage from './pages/contentPage'
import HomePage from './pages/homePage'
import NotFoundPage from './pages/notFoundPage'

const theme = createTheme({
  palette: {
    primary: {
      // PacWest Misty Blue
      main: '#A0AFB7'
    },
    secondary: {
      // PacWest Blue
      main: '#19469B'
    },
    info: {
      // PacWest Coffee
      main: '#9B6E19'
    },
    // PacWest Light Green
    success: {
      main: '#199B2D'
    },
    // Pantone 7621 C (Red)
    warning: {
      main: '#AB2328'
    }
  },
  typography: {
    fontFamily: [
      '"Montserrat"',
      '"sans-serif"',
      '"Segoe UI"',
      'Roboto',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
})

const RegularRoutes = ({ page, setPage, footer, navbar, homepage, contentPages }) => {
  console.log(homepage)
  return (
    <>
      <Navbar content={navbar.data.attributes.Items} mobileData={navbar.data.attributes.MobileConfig} style={navbar.data.attributes.Style} page={page}/>
        <Routes>
          {contentPages.data.map((item, key) => (
            <Route key={key} path={item.attributes.Link} element={<ContentPage setPage={setPage} name={item.attributes.Name} content={item.attributes.Content}/> }/>
          ))}
          <Route path="/" exact element={<HomePage setPage={setPage} pageName={homepage.data.attributes.PageName} content={homepage.data.attributes.Content}/>} />
          <Route element={<NotFoundPage setPage={setPage} />} />
        </Routes>
      <Footer content={footer.data.attributes.Content} />
    </>
  )
}

export default function App () {
  const [page, setPage] = useState('Home')

  useEffect(() => {
    document.title = `${page} | PacWest Pressure Washing`
  }, [page])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Query query={APP_QUERY}>
          {({ data }) => {
            return (
              <Router>
                <RegularRoutes setPage={setPage} page={page} {...data} />
              </Router>
            )
          }}
        </Query>
      </ThemeProvider>
    </div>
  )
}
