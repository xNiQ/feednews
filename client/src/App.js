import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/Auth';
import AdminDashboard from './pages/AdminDashboard';
import PostEditor from './pages/PostEditor';
import CreatePost from './pages/CreatePost';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home}/>
      <Route exact path='/:slug' component={PostDetails}/>
      

        <Auth exact path="/admin/login-to-admin-dashboard" component={AuthPage} />
        <PrivateRoute component={AdminDashboard} exact path="/admin/dashboard"/>
        <PrivateRoute component={PostEditor} exact path="/admin/dashboard/edit/:slug"/>
        <PrivateRoute component={CreatePost} exact path="/admin/dashboard/create"/>
    </Router>
  );
}

export default App;
