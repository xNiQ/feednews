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
    height: 5rem;
    background-color: black;
    color: white;

    @media (min-width: 768px) {
        justify-content: space-evenly;
    }
`

const LogoText = styled(Link)`
    font-size: 1.4rem;
    margin: 0;
    color: white;
    text-decoration: none;
    transition: transform 0.25s ease;

    @media (min-width: 768px) {
        font-size: 2rem;
    }

    &:hover{
        transform: scale(1.1,1.1);
    }
`

const OtherText = styled(Link)`
    font-size: 0.9rem;
    margin: 0;
    color: white;
    text-decoration: none;
    transition: transform 0.25s ease;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }

    &:hover{
        transform: scale(1.1,1.1);
    }
`

const Navbar = (props) => {
    return (
        <GlobalStyle>
            <Nav>
            <OtherText to="/zasady">Zasady</OtherText>
            <LogoText to="/">Twojerabaciki.pl</LogoText>
            <OtherText to="/kontakt">Kontakt</OtherText>
            {/* <Link to="/admin/dashboard"><TestButton>Admin</TestButton></Link> */}
            </Nav>
        </GlobalStyle>
    )
} 

export default Navbar;