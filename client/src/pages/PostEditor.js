import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            content: "Tu pojawi się tekst..",
            title: "",
            titleImg: "",
            tag: "",
            user: "",
            error: false            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    }

    async componentDidMount() {
        const { match : { params }} = this.props;
        if(params.slug) {
            const response = await axios.get(`/post/${params.slug}`);
            const responseData = response.data[0];
    
            const {_id, content, title, titleImg, tag, user } = responseData;
            this.setState({
                _id,
                content,
                title,
                titleImg,
                tag,
                user
            })
        }
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { title, titleImg, tag, user, content } = this.state;
        let postDetails = { title,titleImg,tag,user,content };
        const token = localStorage.getItem('token');
        if(postDetails) {
            const createRequest = await axios.post('/post/create', postDetails, {
                headers: { authorization: token}
            });
            if(createRequest.data.success == undefined) {
                window.location = '/admin/dashboard';
            } else {
                this.setState({error: true})
            }

        } else {
            return 0;
        }

    }

    async handleSubmitEdit(_id) {
        const { title, titleImg, tag, user, content } = this.state;
        let postDetails = {_id,titleImg,tag,user,content };
        const token = localStorage.getItem('token');
        const changeRequest = await axios.post(`/post/change`, postDetails, {
            headers: { authorization: token}
        });
        if(changeRequest.data.success == undefined) {
            window.location = '/admin/dashboard';
        } else {
            this.setState({error: true})
        }
    }

    render() {
        return(
            <Wrapper>
                <Link to='/admin/dashboard'><StyledButton>Wstecz</StyledButton></Link>
                <h1>Kreator postu</h1>
                {this.state.error ? <ErrorHandler/> : null}
                {this.state._id ? <StyledInput onChange={this.handleChange} disabled value={this.state.title} required name="title" type="text" placeholder="Tytuł"/> : <StyledInput onChange={this.handleChange} value={this.state.title} required name="title" type="text" placeholder="Tytuł"/>}
                <StyledInput onChange={this.handleChange} value={this.state.titleImg} required name="titleImg" type="text" placeholder="Img URL"/>
                <StyledInput onChange={this.handleChange} value={this.state.tag} required name="tag" type="text" placeholder="Tag"/>
                <StyledInput onChange={this.handleChange} value={this.state.user} required name="user" type="text" placeholder="Kto dodał? (np: admin)"/>
                <InsideWrapper>
                    <TextArea value={this.state.content} required name="content" placeholder="Zacznij pisać.." onChange={this.handleChange}></TextArea>
                </InsideWrapper>
                    <StyledButton type="submit" onClick={this.handleSubmit}>Dodaj nowy post</StyledButton>
                    {this.state._id ? <StyledButton type="submit" onClick={() => {this.handleSubmitEdit(this.state._id)}}>Edytuj post</StyledButton> : null}
                    <h1>Podgląd contentu</h1>
                <ContentWrapper dangerouslySetInnerHTML={{__html: this.state.content}}></ContentWrapper>
            </Wrapper>
        )
    }
}

const ErrorHandler = () => (
    <ErrorHandlerFlash>Post o takim tytule już istnieje!</ErrorHandlerFlash>
);


const Wrapper = styled.div`
    margin: 2rem;
    padding: 0;
    box-sizing: border-box;
    h1 {
        margin: 1rem;
    }
`

const ErrorHandlerFlash = styled.h1`
    color: red;
    font-size: 1.3rem;
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
	border: 3px solid #4d4d4d;
	padding: 5px;
	font-family: Tahoma, sans-serif;
`

const StyledInput = styled.input`
    width: 600px;
	height: 40px;
	border: 3px solid #4d4d4d;
    margin: 1.2rem;
	padding: 5px;
	font-family: Tahoma, sans-serif;
`

export default PostEditor;
