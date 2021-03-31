import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Order from './components/Order/Order';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css'

export const UserContext = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  return (
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
      <Router>
        <Header/>
        <Switch>
          <PrivateRoute path='/admin'>
            <Admin />
          </PrivateRoute>
          <PrivateRoute path='/order'>
            <Order/>
          </PrivateRoute>
          <PrivateRoute path='/checkout/:checkoutBookId'>
            <Checkout/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider >
  );
}

export default App;
