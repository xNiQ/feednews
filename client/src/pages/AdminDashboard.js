import React, { Component } from 'react';
import Navbar from '../components/NavbarAdmin';
import { getUserID } from '../controllers/auth';
import axios from 'axios'
import styled from 'styled-components';
import { deletePost } from '../controllers/postController'; 


// Styled components

const GlobalStyle = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Ruda:wght@500&display=swap');
    margin: 0;
    padding: 0;
    *, *::before, *::after { box-sizing: border-box; }`

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
`


const PostButton = styled.button`
    margin: 5%;
    font-family: 'Ruda', sans-serif;
    font-size: 0.8rem;
    width: 10%;
    padding: 1%;
    border-radius: 5px;
    background-color: black;
    color: white;
`;

const PostBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const PostItem = styled.div`
    display: flex;
    align-items: center;
    margin: 1.1%;
    padding: 1%;
    width: 90%;
    height: 10%;
    border: solid 1px black;
    border-radius: 5px;
    font-family: 'Ruda', sans-serif;
    font-size: 12px;

    h5 {
      margin: 5px;
      font-size: 18px;
      color: red;
    }

    img {
      height: 10%;
      width: 10%;
      border: solid 2px black;
      margin-left: 2%;
    }

    .postbtns {
      justify-self: flex-end;
    }
`





// Components

const Post = (props) => {

    return (
      <PostBox>
        <PostItem>
          {/* <h5> ID: </h5><h2>{props._id}</h2> */}
          <h5> Title: </h5><h2>{props.title}</h2>
          <h5> Slug: </h5><h2>{props.slug}</h2>
          <h5>Img: </h5><img src={props.titleImg} alt="not found img"/>

          <PostButton className="postbtns">Edytuj</PostButton>
          <PostButton onClick={props.onClick} className="postbtns">Usuń</PostButton>
        </PostItem>
      </PostBox>
    )
};


// Page Admin Dashboard

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      login: 'null',
      posts: []
    }
  }

  async componentDidMount() {
    const _id = getUserID();

    const username = await axios.get(`/user/${_id}`);
    const { login } = username.data;
    this.setState({login});

    const postsResponse = await axios.get('/post/', {
      headers : { 'authorization' : localStorage.getItem('token')}
    });
    this.setState({posts : postsResponse.data });
    console.log(this.state.posts);
  }

  handleDelete(slug) {
    const { posts } = this.state;
    const newPostArray = posts.filter(el => {
      return el.slug != slug;
    })
    axios.delete(`/post/delete/${slug}`, {
      headers : { authorization : localStorage.getItem('token')}
    })
    // deletePost(slug)
    this.setState({posts : newPostArray})
  }

  render() {
    const { login, posts } = this.state;

    return (
      <div>
        <GlobalStyle>
          <Navbar username={login}/>

          <FlexBox>
            <PostButton>Dodaj post</PostButton>
            {posts.map(post => {
                return <Post onClick={() => this.handleDelete(post.slug)} key={post._id} title={post.title} slug={post.slug} titleImg={post.titleImg} content={post.content}/>
            })}
            
          </FlexBox>
        </GlobalStyle>
      </div>
    )
  }
}

export default AdminDashboard;