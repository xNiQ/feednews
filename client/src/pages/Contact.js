import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import validator from 'email-validator';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            content : "",
            errorEmail: false,
            errorContent: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, content } = this.state;
        if(validator.validate(email)) {
            if(email && content) {
                this.setState({errorContent : false, errorEmail: false, sent: true})
                axios.post('/message/send', {email, content});
            } else {
                this.setState({errorContent : true})
            }
        } else {
            this.setState({errorEmail: true})
        }
    }

    render() {
        let flashMessage;
        const { errorEmail, errorContent, sent } = this.state;
        if(errorEmail || errorContent) {
            flashMessage = "<h1 style='color: red'>Niepoprawny email!</h1>"
        } else if(!errorEmail && !errorContent && sent) {
            flashMessage = "<h1 style='color: green'>Wysłano wiadomość!</h1>"
        }

        return(
            <BodyStyle>
                <Navbar/>
                <form>
                    <h1>Skontaktuj się z nami..</h1>
                    <h1 id="errorBox" dangerouslySetInnerHTML={{__html: flashMessage}}></h1>
                    {/* <StyledLabel for="email">E-mail</StyledLabel> */}
                    <StyledInput onChange={this.handleChange} name="email" placeholder="Email.." required type="email"/> <br/>
                    {/* <StyledLabel for="content">Wiadomość</StyledLabel> */}
                    <StyledTextArea onChange={this.handleChange} id="content" name="content" required placeholder="Tu wpisz swoją wiadomość.." type="text"/><br/>
                    <StyledButton onClick={this.handleSubmit}>Wyślij wiadomość</StyledButton>
                </form>
            </BodyStyle>
        )
    }
}

const BodyStyle = styled.div`
    background-color: white;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-weight: 600;

    #content {
        height: 100px;
    }
    
    form {
        margin: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #errorBox {
        margin: 1rem;
        font-size: 1rem;
    }
`

const StyledButton = styled.button`
      background: black;
      color: white;
      width: 180px;
      height: 2rem;
      font-size: 1.3rem;
      padding: 4px 0;
      margin-left: 1.2rem;
      border: none;
`

// const StyledLabel = styled.label`
// 	font-family: Tahoma, sans-serif;
//     font-size: 1.3rem;
// `

const StyledTextArea = styled.textarea`
    width: 25rem;
	height: 40px;
	border: 3px solid #4d4d4d;
    margin: 1.2rem;
	padding: 4px;
	font-family: Tahoma, sans-serif;
`

const StyledInput = styled.input`
    width: 25rem;
	height: 40px;
	border: 3px solid #4d4d4d;
    margin: 1.2rem;
	padding: 4px;
	font-family: Tahoma, sans-serif;
`

export default Contact;