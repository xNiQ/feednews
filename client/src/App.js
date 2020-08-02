import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/Auth';
import AdminDashboard from './pages/AdminDashboard';
import PostEditor from './pages/PostEditor';
import AuthPage from './pages/AuthPage';
import Contact from './pages/Contact';
import Rules from './pages/Rules';
import ErrorPage from './pages/404';

function App() {
  return (
    <Router>
      <Switch>   
      <Route exact path='/' component={Home}/>
      <Route exact path='/kontakt' component={Contact}/>
      <Route exact path='/zasady' component={Rules}/>
      <Route exact path='/:slug' component={PostDetails}/>
      

        <Auth exact path="/admin/login-to-admin-dashboard" component={AuthPage} />
        <PrivateRoute component={AdminDashboard} exact path="/admin/dashboard"/>
        <PrivateRoute component={PostEditor} exact path="/admin/dashboard/edit/:slug"/>
        <PrivateRoute component={PostEditor} exact path="/admin/dashboard/create"/>

        <Route path='*' component={ErrorPage}/>
        <Route path='/error/404' component={ErrorPage}/>
        </Switch>
    </Router>
  );
}

export default App;
