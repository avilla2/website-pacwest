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
import ScrollToTop from './components/utils/scrollToTop'

const theme = ({ Palette }) => {
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
      }
    }
  })
}

const RegularRoutes = ({ page, setPage, navIndex, setNavIndex, footer, navbar, homepage, contentPages }) => {
  return (
    <>
      <Navbar content={navbar.data.attributes.Items} mobileData={navbar.data.attributes.MobileConfig} style={navbar.data.attributes.Style} appearance={navbar.data.attributes.Appearance} page={page} navIndex={navIndex} />
        <Routes>
          {contentPages.data.map((item, key) => (
            <Route key={key} path={item.attributes.Link} element={<ContentPage setNavIndex={setNavIndex} path={item.attributes.Link} setPage={setPage} name={item.attributes.Name} content={item.attributes.Content}/> }/>
          ))}
          <Route path="/" exact element={<HomePage setNavIndex={setNavIndex} setPage={setPage} path="/" pageName={homepage.data.attributes.PageName} content={homepage.data.attributes.Content}/>} />
          <Route path="*" element={<NotFoundPage setPage={setPage} />} />
        </Routes>
      <Footer content={footer.data.attributes.Content} />
    </>
  )
}

export default function App () {
  const [page, setPage] = useState('Home')
  const [navIndex, setNavIndex] = useState(null)

  useEffect(() => {
    document.title = `${page} | PacWest Pressure Washing`
  }, [page])
  return (
    <div className="App">
        <Query query={APP_QUERY}>
          {({ data }) => {
            return (
              <ThemeProvider theme={theme(data.siteSettings.data.attributes)}>
                <Router>
                  <ScrollToTop />
                  <RegularRoutes setPage={setPage} page={page} {...data} setNavIndex={setNavIndex} navIndex={navIndex}/>
                </Router>
              </ThemeProvider>
            )
          }}
        </Query>
    </div>
  )
}
