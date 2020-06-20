import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/Auth';
import AdminDashboard from './pages/AdminDashboard';
import PostDetails from './pages/PostDetails'
import Main from './pages/Main';


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        {/* USER ROUTES */}
        <Route exact path="/" component={Main}/>
        <Route exact strict path="/post/:slug" component={PostDetails} />

        {/* ADMIN ROUTES */}
        <Auth exact path="/login-to-admin-dashboard" component={AuthPage} />
        <PrivateRoute component={AdminDashboard} exact path="/dashboard"/>
      </BrowserRouter>
    )
  }
}

export default App;
