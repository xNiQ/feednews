import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import Main from './pages/Main';

class App extends Component {
  render() {
    return(
      <div>
      <BrowserRouter>
        <Route exact path="/" component={Main}/>
        <Route exact path="/login-to-admin-dashboard" component={AuthPage} />
        <PrivateRoute component={AdminDashboard} exact path="/dashboard"/>
      </BrowserRouter>

      </div>
    )
  }
}

export default App;
