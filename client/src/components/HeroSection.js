import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class HeroSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : []
        };
    }
    
    async componentDidMount() {
        const response = await Axios.get('/post');
        const responseArray = response.data;
        const reversedArray = responseArray.reverse();
        const slicedArray = reversedArray.slice(0,2);
        this.setState({posts : slicedArray});
    }

    render() {
        return (
            <GlobalStyle>
                <FlexWrapper>
                    <HeroHeader>Nasz wybór dla ciebie na dziś</HeroHeader>
                </FlexWrapper>
                <HeroWrapper>
                    <FlexWrapper id="heroFlex">
                    {this.state.posts.map((element, i) => {
                        return (
                            <ImgWrapper key={i}>
                                <Link to={element.slug}>
                                    <HeroImg src={element.titleImg}/>
                                </Link>
                                <HeroCaption>
                                    <HeroImgText to={element.slug}>{element.title} </HeroImgText>
                                    <ReadMoreButton to={element.slug}>Czytaj dalej</ReadMoreButton>
                                </HeroCaption>
                            </ImgWrapper>
                        );
                    })}
                    </FlexWrapper>
                </HeroWrapper>
            </GlobalStyle>
        )
    }
}  

const HeroHeader = styled.h1`
    font-size: 1.7rem;
    margin-top: 1rem;

    &::after {
        display: block;
        content: '';
        position: relative;
        background-color: black;
        height: 0.5rem;
        border-radius: 5px;
        margin: 0.3rem;
        width: 100%;
    }
`
const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`

const ReadMoreButton = styled(Link)`
    width: 25%;
    height: 3.5rem;
    font-size: 1.1rem;
    text-align: center;
    margin: 0 1rem;
    padding: 0.4rem;
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    background-color: #03adfc;
`

const GlobalStyle = styled.div`
    &, &::before, &::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`

const HeroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: auto;
    height: auto;
    background-color: white;

    @media (min-width: 768px) {
        & {
            flex-direction: row;
        }
    }
`

const HeroImg = styled.img`
    height: auto;
    width: 100%;
    margin: 2rem 0rem;
    
    @media (min-width: 768px) {
        width: 90%;
    }
`

const HeroCaption = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    margin-top: -2rem;
    padding: 1rem;
    background-color: coral;
    
    @media (min-width: 768px) {
        width: 90%;
    }
`

const HeroImgText = styled.h1`
    font-size: 18px;
    color: white;
`

const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */

    @media (min-width: 768px) {
        width: 60%;
    }    

    /* img {
        max-width: 100%;
        height: auto;
        margin: 2rem 0;
    } */
`

export default HeroSection;