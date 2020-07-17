import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "Tu pojawi się tekst..",
            title: "",
            titleImg: "",
            tag: "",
            user: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const { title, titleImg, tag, user, content } = this.state;
        let postDetails = {
            title,
            titleImg,
            tag,
            user,
            content
        }
        const token = localStorage.getItem('token');
        if(postDetails) {
            axios.post('/post/create', postDetails, {
                headers: { authorization: token}
            });
        }

    }

    render() {
        return(
            <Wrapper>
                <Link to='/admin/dashboard'><StyledButton>Wstecz</StyledButton></Link>
                <h1>Kreator postu</h1>
                <StyledInput onChange={this.handleChange} required name="title" type="text" placeholder="Tytuł"/>
                <StyledInput onChange={this.handleChange} required name="titleImg" type="text" placeholder="Img URL"/>
                <StyledInput onChange={this.handleChange} required name="tag" type="text" placeholder="Tag"/>
                <StyledInput onChange={this.handleChange} required name="user" type="text" placeholder="Kto dodał? (np: admin)"/>
                <InsideWrapper>
                    <TextArea required name="content" placeholder="Zacznij pisać.." onChange={this.handleChange}></TextArea>
                </InsideWrapper>
                    <StyledButton type="submit" onClick={this.handleSubmit}>Dodaj post</StyledButton>
                <ContentWrapper dangerouslySetInnerHTML={{__html: this.state.content}}></ContentWrapper>
            </Wrapper>
        )
    }
}


const Wrapper = styled.div`
    margin: 2rem;
    padding: 0;
    box-sizing: border-box;
    h1 {
        margin: 1rem;
    }
`
const ContentWrapper = styled.div`
    margin: 1rem;
    margin-top: 5rem;
`

const StyledButton = styled.button`
      background: black;
      color: white;
      width: 180px;
      height: 2rem;
      font-size: 1.3rem;
      padding: 4px 0;
      margin-left: 1.2rem;
      border: none;
`

const InsideWrapper = styled.div`
    /* display: flex; */
    margin: 1.2rem;
    justify-content: space-around;
    align-items: center;
`

const TextArea = styled.textarea`
	width: 600px;
	height: 120px;
	border: 3px solid #cccccc;
	padding: 5px;
	font-family: Tahoma, sans-serif;
`

const StyledInput = styled.input`
    width: 600px;
	height: 40px;
	border: 3px solid #cccccc;
    margin: 1.2rem;
	padding: 5px;
	font-family: Tahoma, sans-serif;
`


export default CreatePost;