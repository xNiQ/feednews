import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post : [],
            posts : []
        }
        this.shuffle = this.shuffle.bind(this);
    }

    async componentDidMount() {
        const allPosts = await axios.get(`/post/`);
        const allPostsData = allPosts.data;

        // Post by ID
        const { match : { params }} = this.props;
        const response = await axios.get(`/post/${params.slug}`);
        const postResponse = response.data[0];
        if(!postResponse) {
            window.location.replace("/error/404");
        }
        this.setState({post : postResponse, posts: allPostsData})
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    render() {
        const { post, posts } = this.state;
        return (
            <GlobalStyle>
                <Helmet>
                     <title>{`Twojerabaciki.pl - ${post.title}`}</title>
                </Helmet>
                <Navbar/>
                <Header>
                    <img src={post.titleImg} alt="Title Img"/>
                    <h1>{post.title}</h1>
                        <h2 id="postTag">{post.tag}</h2>
                        <h2>Autor: {post.user}</h2>
                </Header>
                <PostDescription>
                    <div dangerouslySetInnerHTML={{ __html: post.content}} />
                </PostDescription>
                    <h2 id="watchIt">Warto zobaczyć także:</h2>
                <WatchLater>
                    {this.shuffle(posts).slice(0,5).map((element,i) => {
                        return ( <WatchLaterItem key={i} handleChangePage={this.handleChangePage} titleImg={element.titleImg} slug={element.slug} title={element.title}/> )
                    })}
                </WatchLater>
            </GlobalStyle>
        )
    }
}

const WatchLaterItem = (props) => (
    <WatchLaterItemWrapper>
        <Link to={props.slug}><img src={props.titleImg} alt="watchLaterImg"/></Link>
        <Link to={props.slug} onClick={() => { window.location.replace(`/${props.slug}`)}}><h1>{props.title}</h1></Link>
    </WatchLaterItemWrapper>
)

const GlobalStyle = styled.header`
    &, &::before, &::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #watchIt {
        margin: 2rem;
    }
`

const PostDescription = styled.section`
    margin: 5rem 2rem;
`

const WatchLaterItemWrapper = styled.div`
    margin: 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33%;

    a {
        color: black;
    }

    img {
        width: 10rem;
        height: 10rem;
    }

    h1 {
        font-size: 1.2rem;
    }
`

const WatchLater = styled.section`
    margin: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const Header = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2rem auto;

    h1 {
        font-size: 3rem;
        margin: 1.5rem 0;
    }

    h2 { 
        font-size: 1rem;
    }

    img {
        height: auto;
        width: 25rem;
    }

    #postTag {
        color: coral;
    }
`

export default PostDetails;