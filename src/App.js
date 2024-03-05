import React, { useState, useEffect } from 'react'
import './App.css'
import SiteNavbar from './components/pageElements/navbar'
import SiteFooter from './components/pageElements/footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import APP_QUERY from './queries/appQuery'
import Query from './components/utils/query'
import ContentPage from './pages/contentPage'
import HomePage from './pages/homePage'
import NotFoundPage from './pages/notFoundPage'
import NoContentPage from './pages/noContentPage'
import ScrollToTop from './components/utils/scrollToTop'

const createThemeConfigs = ({ Palette }) => {
  const colors = ['primary', 'secondary', 'info', 'success', 'warning']
  const filteredColors = colors.filter(val => Palette[val] != null)
  const palette = Object.fromEntries(filteredColors.map(val => [val, { main: Palette[val] }]))
  return createTheme({
    palette,
    typography: {
      fontFamily: [
        '"Roboto Flex"',
        '"Russo One"',
        '"sans-serif"',
        '"Segoe UI"',
        'Roboto',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      body1: {
        fontWeight: 400
      },
      h2: {
        fontFamily: [
          '"Russo One"',
          '"Roboto Flex"',
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      },
      h6: {
        fontFamily: [
          '"Russo One"',
          '"Roboto Flex"',
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      },
      subtitle1: {
        fontFamily: [
          '"Russo One"',
          '"Roboto Flex"',
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      },
      button: {
        fontFamily: [
          '"Russo One"',
          '"Roboto Flex"',
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      }
    }
  })
}

const RegularRoutes = ({ page, setPage, navIndex, setNavIndex, siteId, setSiteId, Footer, Navbar, Homepage, ContentPages }) => {
  return (
    <>
      <SiteNavbar siteId={siteId} setSiteId={setSiteId} page={page} navIndex={navIndex} {...Navbar.data.attributes} />
        <Routes>
          {ContentPages.data.map((item, key) => (
            <Route key={key} path={item.attributes.Link} element={<ContentPage setNavIndex={setNavIndex} path={item.attributes.Link} setPage={setPage} name={item.attributes.Name} content={item.attributes.Content}/> }/>
          ))}
          <Route path="/" exact element={<HomePage setNavIndex={setNavIndex} setPage={setPage} path="/" pageName={Homepage.data.attributes.PageName} content={Homepage.data.attributes.Content}/>} />
          <Route path="*" element={<NotFoundPage setPage={setPage} />} />
        </Routes>
      <SiteFooter {...Footer.data.attributes} />
    </>
  )
}

export default function App () {
  const DEFAULT_SITE_ID = 1
  const [page, setPage] = useState('Home')
  const [navIndex, setNavIndex] = useState(null)
  const [siteId, setSiteId] = useState(DEFAULT_SITE_ID)

  useEffect(() => {
    document.title = `${page} | PacWest Pressure Washing`
  }, [page])
  return (
    <div className="App">
        <Query query={APP_QUERY} variables={{ id: siteId }}>
          {({ data }) => {
            const websiteContent = data?.website?.data?.attributes
            if (!websiteContent) { return (<NoContentPage setPage={setPage} />) }

            return (
              <ThemeProvider theme={createThemeConfigs(websiteContent.SiteSettings.data.attributes)}>
                <Router>
                  <ScrollToTop />
                  <RegularRoutes setPage={setPage} page={page} {...websiteContent} setNavIndex={setNavIndex} navIndex={navIndex} siteId={siteId} setSiteId={setSiteId}/>
                </Router>
              </ThemeProvider>
            )
          }}
        </Query>
    </div>
  )
}
