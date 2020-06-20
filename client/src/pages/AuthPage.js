import React, { Component } from 'react';
import InvalidCredentials from '../components/InvalidCredentials';
import '../styles/AuthPage.scss'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { auth } from '../controllers/auth';


class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            login : '',
            password : '',
            success: true
        }
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { login, password } = this.state;
        let credentials = {login,password}
        const authorize = await auth(credentials);
        if(!authorize) {
            //handle login error
            // this.setState({success : !this.state.success})
            this.setState({success : false})
        } else {
            window.location.reload()
        }
    }

    render() {

        const { success } = this.state;

        return(
            <Box className="box-container">
                <h1 className="login-header">Zaloguj się..</h1><br/>
                {success ? '' : <InvalidCredentials/>}
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