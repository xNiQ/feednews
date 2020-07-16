import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        // All posts
        const allPosts = await axios.get(`/post/`);
        const allPostsData = allPosts.data;

        // Post by ID
        const { match : { params }} = this.props;
        const response = await axios.get(`/post/${params.slug}`);
        const postResponse = response.data[0];
        this.setState({post : postResponse, posts : allPostsData})

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
                <Navbar/>
                <Header>
                    <div className="imgWrapper">
                        <img src={post.titleImg} alt="Title Img"/>
                    </div>
                    <div className="infoWrapper">
                        <h1>{post.title}</h1>
                        <div className="moreInfoWrapper">
                            <h2 id="postTag">{post.tag}</h2>
                            <h2>Autor: admin</h2>
                            <h2>{post.createdAt}</h2>
                        </div>
                    </div>
                </Header>
                <PostDescription>
                    <div dangerouslySetInnerHTML={{ __html: post.content}} />
                </PostDescription>
                    <h2 id="watchIt">Warto zobaczyć także:</h2>
                <WatchLater>
                    {this.shuffle(posts).slice(0,5).map((element,i) => {
                        return ( <WatchLaterItem key={i} titleImg={element.titleImg} slug={element.slug} title={element.title}/> )
                    })}
                </WatchLater>
            </GlobalStyle>
        )
    }
}

const WatchLaterItem = (props) => (
    <WatchLaterItemWrapper>
        <img src={props.titleImg} alt="watchLaterImg"/>
        <Link to={props.slug}><h3>{props.title}</h3></Link>
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
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
        color: black;
    }

    img {
        width: 10rem;
        height: 10rem;
    }
`

const WatchLater = styled.section`
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    margin-top: 2rem;

    .imgWrapper {
        width: 40%;
        margin-left: 2rem;
    }

    img {
        height: 25rem;
    }

    .infoWrapper {
        display: flex;
        flex-direction: column;
        width: 60%;
        margin-right: 10rem;
        margin-left: 3rem;
    }

    #postTag {
        color: coral;
    }
`

export default PostDetails;