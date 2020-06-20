import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    justify-content: center;
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
    }`

const Navbar = props => {

    return(
        <GlobalStyle>
            <Nav>
                <NavItem><Link to="/">LoL News Feed</Link></NavItem>
                <NavItem><Link to="/login-to-admin-dashboard">Admin</Link></NavItem>
            </Nav>
        </GlobalStyle>
    )
}

export default Navbar;