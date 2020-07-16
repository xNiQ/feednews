import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GlobalStyle = styled.div`
    &, &::before, &::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 3rem;
    background-color: black;
    color: white;
`

const LogoText = styled(Link)`
    font-size: 1.5rem;
    margin: 0;
    color: white;
    text-decoration: none;
    transition: transform 0.25s ease;

    &:hover{
        transform: scale(1.1,1.1);
    }
`

const TestButton = styled.button`
    width: 4rem;
    background-color: black;
    color: white;
    border: solid 1px white;
`

const Navbar = (props) => {
    return (
        <GlobalStyle>
            <Nav>
            <LogoText to="/">Twojerabaciki.pl</LogoText>
            <Link to="/admin/dashboard"><TestButton>Admin</TestButton></Link>
            </Nav>
        </GlobalStyle>
    )
} 

export default Navbar;