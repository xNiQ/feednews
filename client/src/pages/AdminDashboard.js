import React, { Component } from 'react';
import Navbar from '../components/NavbarAdmin';
import { getUserID } from '../controllers/auth';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

// Page Admin Dashboard

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'null',
      posts: [],

    }
    this.handleDelete = this.handleDelete.bind(this);
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
  }

  handleDelete(slug) {
    const { posts } = this.state;
    const newPostArray = posts.filter(el => {
      return el.slug !== slug;
    })
    axios.delete(`/post/delete/${slug}`, {
      headers : { authorization : localStorage.getItem('token')}
    })
    this.setState({posts : newPostArray})
  }

  render() {
    const { login, posts } = this.state;

    return (
      <div>
        <GlobalStyle>
          <Navbar username={login}/>
          <FlexBox>
            <PostButton to="/admin/dashboard/create">Dodaj post</PostButton>
            {posts.map(post => {
                return <Post onClickDelete={() => this.handleDelete(post.slug)} onClickEdit={this.handleEdit} key={post._id} title={post.title} slug={post.slug} titleImg={post.titleImg} content={post.content}/>
            })}
          </FlexBox>
        </GlobalStyle>
      </div>
    )
  }
}

// Components

const Post = (props) => {
  const handleDeleteClick = (func) => {
    confirmAlert({
      title: 'Potwierdź',
      message: 'Na pewno chcesz usunąć?',
      buttons: [
        {
          label: 'Tak',
          onClick: () => func()
        },
        {
          label: 'Nie',
          onClick: () => { return false; }
        }
      ]
    });
  }

  return (
    <PostBox>
      <PostItem>
        <h5> Title: </h5><h2>{props.title}</h2>
        <h5> Slug: </h5><h2>{props.slug}</h2>
        <h5>Img: </h5><img src={props.titleImg} alt="not found img"/>

        <PostButton to={`/admin/dashboard/edit/${props.slug}`} className="postbtns">Edytuj</PostButton>
        <PostButton onClick={() => handleDeleteClick(props.onClickDelete)} className="postbtns">Usuń</PostButton> 

      </PostItem>
    </PostBox>
  )
};

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


const PostButton = styled(Link)`
    margin: 5%;
    font-family: 'Ruda', sans-serif;
    font-size: 1.1rem;
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
    align-items: center;
`

const PostItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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

export default AdminDashboard;