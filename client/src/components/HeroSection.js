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
                    <HeroHeader>Najlepsze promocje</HeroHeader>
                </FlexWrapper>
                <HeroWrapper>
                    {this.state.posts.map((element, i) => {
                        return (
                            <ImgWrapper key={i}>
                                <Link to={element.slug}>
                                    <HeroImg src={element.titleImg}/>
                                </Link>
                                <HeroCaption>
                                    <HeroImgText to={element.slug}>{element.title} <br/> @ {element.createdAt.slice(0,10)} </HeroImgText>
                                </HeroCaption>
                            </ImgWrapper>
                        );
                    })}
                </HeroWrapper>
            </GlobalStyle>
        )
    }
}  

const HeroHeader = styled.h1`
    font-size: 1.7rem;

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
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto;
    background-color: white;


    /* img { width: 100%; } */
    @media (min-width: 768px) {
        & {
            flex-direction: row;
        }
    }
`

const HeroImg = styled.img`
    height: 25rem;
    margin: 2rem 0;
`

const HeroCaption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 5rem;
    margin-left: 2rem;
    margin-top: -7.8rem;
    padding: 5px;
    background-color: black;
`

const HeroImgText = styled(Link)`
    font-size: 18px;
    color: white;
`

const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;

    img {
        width: 90%;
        margin: 2rem 0;
        margin-left: 1.5rem;
    }
`

export default HeroSection;