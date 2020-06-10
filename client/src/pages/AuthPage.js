import React, { Component } from 'react';
import '../styles/AuthPage.scss'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { auth, isLogged } from '../controllers/auth';
import { Redirect } from 'react-router-dom';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            login : '',
            password : ''
        }
    }

    componentDidMount() {
        if(isLogged()) {
            return <Redirect to='/dashboard'/>
        }
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        const { login, password } = this.state;
        e.preventDefault();
        let credentials = {
            login,
            password
        }
        auth(credentials, '/dashboard');
    }

    render() {
        return(
            <Box className="box-container">
                <h1 className="login-header">Zaloguj się..</h1><br/>
                <form onSubmit={this.handleSubmit}>
                    <TextField onChange={this.onChange} className="input login-textfield" name="login" id="standard-basic" label="Login" />
                    <TextField onChange={this.onChange} type="password" className="input password-textfield" name="password" id="standard-basic" label="Hasło" />
                    <Button type="submit" variant="outlined" color="primary">Zaloguj się</Button>
                </form>
            </Box>
        )
    }
}

export default AuthPage;