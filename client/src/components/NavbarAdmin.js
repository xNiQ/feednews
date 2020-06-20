import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from '../controllers/auth';

const GlobalStyle = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Ruda:wght@500&display=swap');
    margin: 0;
    padding: 0;
    *, *::before, *::after { box-sizing: border-box; }`

const Nav = styled.div`
    width: 100%;
    height: 3em;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `

const NavItem = styled.div`
    margin-right: 2.5%;
    margin-left: 2.5%;
    a {
        font-size: 1.5rem;
        color: white;
        font-family: 'Ruda', sans-serif;
        text-decoration: none;
        /* transition: all 0.5s ease-in-out; */
    }

    a:hover{
        -webkit-text-stroke: 1.5px white; 
    }

    h4 {
        font-size: 1.1rem;
        color: white;
        font-family: 'Ruda', sans-serif;
    }

    h3 {
        color: red;
    }
    `

const NavbarAdmin = props => {

    return(
        <GlobalStyle>
            <Nav>
                <NavItem><Link to="/">Home</Link></NavItem>
                <NavItem><h4>Jesteś zalogowany jako <h5>{props.username}</h5></h4></NavItem>
                <NavItem><Link id="logout" onClick={logout} to="/">Wyloguj</Link></NavItem>
            </Nav>
        </GlobalStyle>
    )
}

export default NavbarAdmin;