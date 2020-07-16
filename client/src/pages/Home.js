import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import PostsSection from '../components/PostsSection';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : [],
            pages : null
        }
    }

    async componentDidMount() {
        const response = await Axios.get('/post');
        const responseArray = response.data;
        const reversedArray = responseArray.reverse();
        this.setState({posts : reversedArray});

        const { posts } = this.state;
        let amountOfPages;
        if(posts.length > 4) {
            amountOfPages = Math.ceil(posts.length / 4);
        } else {
            amountOfPages = 1;
        }
        this.setState({pages : amountOfPages});
    }

    render() {
        return(
            <BodyStyle>
                <Navbar posts={this.state.posts}/>
                <HeroSection/>
                <PostsSection posts={this.state.posts} pages={this.state.pages}/>
            </BodyStyle>
        )
    }
}

const BodyStyle = styled.div`
    background-color: white;
`

export default Home;