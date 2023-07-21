import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/pageElements/navbar';
import Footer from './components/pageElements/footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CONTENT_PAGE_QUERY from "./queries/contentPageQuery";
import HOME_PAGE_QUERY from "./queries/homePageQuery";
import Query from "./components/utils/query";
import ContentPage from './pages/contentPage';
import HomePage from './pages/homePage';
import NotFoundPage from './pages/notFoundPage';
import NAVBAR_QUERY from './queries/navbarQuery';
import FOOTER_QUERY from './queries/footerQuery';
import LoginPage from './pages/loginPage';
import RestrictedRoute from './components/utils/restrictedRoute';
import AppHomePage from './pages/appHomePage';
import NewAccountPage from './pages/newAccount';

const theme = createTheme({
  palette: {
    primary: {
      // Beta Blue
      main: "#002f6c",
    },
    secondary: {
      // Beta Metallic Gold
      main: "#872",
    },
    info: {
      // Beta Gray
      main: "#D9D9D6",
    },
    // Oregon Green
    success: {
      main: "#004F39",
    },
    // Beta Red
    warning: {
      main: "#AB2328",
    },
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      'sans-serif',
      '"Segoe UI"',
      'Roboto',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


const RegularRoutes = ({page, setPage}) => {
  return (
    <>
      <Query query={NAVBAR_QUERY}>
            {({ data: { navbar } }) => {
              return (
                <Navbar content={navbar.Items} mobileData={navbar.MobileConfig} page={page}/>
              )
            }}
          </Query>  
          <Query query={CONTENT_PAGE_QUERY}>
            {({ data: { contentPages } }) => {
              return (
                  <Query query={HOME_PAGE_QUERY}>
                    {({ data: { homepage } }) => {
                      return (
                        <Switch>
                          {contentPages.map((item, key) => (
                            <Route key={key} path={item.Link} render={ props => ( <ContentPage {...props} setPage={setPage} name={item.Name} content={item.Content}/> ) }/>
                          ))}
                          <Route path="/" exact>
                            <HomePage setPage={setPage} pageName={homepage.PageName} content={homepage.Content}/>
                          </Route>
                          <Route path="/login">
                            <LoginPage setPage={setPage} />
                          </Route>
                          <Route>
                            <NotFoundPage setPage={setPage} />
                          </Route>
                        </Switch>
                      ); 
                    }}
                  </Query>
              ); 
            }}
          </Query>
          <Query query={FOOTER_QUERY}>
            {({ data: { footer } }) => {
              return (
                <Footer content={footer.Content} />
              )
            }}
          </Query>
    </>
  )
}

const AppRoutes = ({page, setPage, token, setToken}) => {
  const [valid, setValid] = useState(false);

  const PrivateRoute = (props) => {
    return (
      <RestrictedRoute {...props} token={token} valid={valid} setValid={setValid}>
        {props.children}
      </RestrictedRoute>
    )
  }

  return (
    <>
      <Switch>
        <Route path='/app/login'>
          <LoginPage setPage={setPage} setToken={setToken}/>
        </Route>
        <Route path='/app/create-account'>
          <NewAccountPage setPage={setPage} />
        </Route>
        <PrivateRoute path='/app/home'>
          <AppHomePage setPage={setPage} />
        </PrivateRoute>
        <Route>
          <NotFoundPage setPage={setPage} />
        </Route>
      </Switch>
    </>
  )
}

export default function App() {
  const [page, setPage] = useState("Beta Theta Pi");
  const [token, setToken] = useState('')

  useEffect(() => {
    document.title = `${page} | Beta Theta Pi Oregon`
  }, [page]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path='/app'>
              <AppRoutes setPage={setPage} page={page} token={token} setToken={setToken} />
            </Route>
            <Route>
              <RegularRoutes setPage={setPage} page={page} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
