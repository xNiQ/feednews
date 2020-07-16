import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class PostsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : [],
            pages : 0,
            currentPage : 1
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }

    // componentDidMount() {
    //     const parsedQuery = queryString.parse(window.location.search);
    //     if(parsedQuery.page) {
    //         // this.setState({currentPage : parsedQuery.page})
    //     } else {
    //         return;
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                posts: this.props.posts,
                pages : this.props.pages
            });
        }
      }

    handlePageChange(up) {
        let { pages, currentPage } = this.state; 
        if(up) {
            if(currentPage >= pages) {
                return false;
            } else {
                this.setState({currentPage : currentPage + 1})
            }
        } else {
            if(currentPage <= 1) {
                return false;
            } else {
                this.setState({currentPage : currentPage - 1})
            }
        }
        window.scrollTo(0, 0)
    }

    handlePagination() {
        const { posts, currentPage } = this.state;
        let currentPostArray = [];
        if(currentPage === 1) {
            currentPostArray = posts.slice(currentPage-1, currentPage*4);
        } else {
            currentPostArray = posts.slice((currentPage-1)*4, (currentPage-1)*4+4)
        }

        return currentPostArray.map((element,i) => (
            <Post key={i} createdAt={element.createdAt} tag={element.tag} slug={element.slug} title={element.title} titleImg={element.titleImg}/>
        ))
    }

    render() {
        return(
           <GlobalStyle>
               <Wrapper>
                    <PostsWrapper>
                        {this.state.pages ? this.handlePagination() : null}
                    </PostsWrapper>
                        <LatestPosts>
                            <h2>Ostatnie promocje</h2>
                            {this.state.posts.slice(0,10).map((element,i) => {
                                return (
                                    <LatestPost key={i} to={element.slug}>{i+1}. {element.title}</LatestPost>
                                )
                            })}
                        </LatestPosts>
               </Wrapper>
            <Pagination handlePageChange={this.handlePageChange} amountOfPages={this.state.pages} currentPage={this.state.currentPage}/>
           </GlobalStyle>
        )
    }
}

const Pagination = (props) => (
    <PaginationWrapper>
        <h4 onClick={() => {props.handlePageChange(0)}}>Wstecz</h4>
        <div>&lt;</div>
        {props.currentPage} z {props.amountOfPages}
        <div>&gt;</div>
        <h4 onClick={() => {props.handlePageChange(1)}}>Dalej</h4>
    </PaginationWrapper>
)

const Post = (props) => (
    <PostDetails>
        <Link to={props.slug}>
        <img src={props.titleImg} alt="titleImg"/>
        </Link>
            <h2 className="postTag">{props.tag}</h2>
            <h1>{props.title}</h1>
            <Link to={props.slug}>Czytaj dalej &gt;&gt;</Link>
            <h2 id="createdAt">{props.createdAt.slice(0,10)}</h2>
    </PostDetails>
)

const PaginationWrapper = styled.div`
    display: flex;
    font-size: 32px;
    justify-content: center;
    align-items: center;
    width: 100%;

    h4 {
        margin: 1rem;
        font-size: 18px;
    }

    h4:hover {
        /* color: gray; */
        cursor: pointer;
    }
`

const LatestPosts = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    margin-left: 5rem;
    margin-top: 2rem;
`

const LatestPost = styled(Link)`
    color: crimson;
    margin: 0.27rem;
    text-decoration: none;
`

const PostDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    background-color: white;
    height: 30rem;
    margin: 2rem;
    -webkit-box-shadow: 1px 2px 9px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 2px 9px 2px rgba(0,0,0,0.75);
    box-shadow: 1px 2px 9px 2px rgba(0,0,0,0.75);
    /* border: solid 1px black; */
    
    h2 {
        font-size: 1rem;
    }

    #createdAt {
        margin-bottom: 3.5rem;
    }

    h1 {
        font-size: 2rem;
        margin: 1rem;
    }

    a {
        color: black;
        font-size: 1.3rem;
    }

    img {
        width: 20rem;
        height: 15rem;
        /* margin-right: 2rem; */
        margin-top: 3rem;
    }

    .postTag {
        color: coral;
        margin-top: 1rem;
    }
`

const GlobalStyle = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`

const PostsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    font-size: 1rem;

    @media (min-width: 768px) {
        width: 50%;
    }
`

const Wrapper = styled.header`
    display: flex;
    flex-direction: column-reverse;
    font-size: 1.2rem;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export default PostsSection;