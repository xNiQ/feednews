import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : []
        }
    }

    async componentDidMount() {
        const response = await Axios.get('/post');
        const responseArray = response.data;
        this.setState({posts : responseArray});
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
        return(
            <BodyStyle>
                <Navbar posts={this.state.posts}/>
                <h1>Niestety nie znaleźliśmy postu o takim tytule :( <br/>
                Może zainteresujesz się którymś z tych postów:</h1>
                <Wrapper>
                    {this.shuffle(this.state.posts).slice(0,5).map((element,i) => {
                        return ( <WatchLaterItem key={i} handleChangePage={this.handleChangePage} titleImg={element.titleImg} slug={element.slug} title={element.title}/> )
                    })}
                </Wrapper>
            </BodyStyle>
        )
    }
}

const BodyStyle = styled.div`
    background-color: white;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-weight: 600;

    h1 {
        margin: 1rem;
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const WatchLaterItem = (props) => (
    <WatchLaterItemWrapper>
        <img src={props.titleImg} alt="watchLaterImg"/>
        <Link to={props.slug} onClick={() => { window.location.replace(`/${props.slug}`)}}><h1>{props.title}</h1></Link>
    </WatchLaterItemWrapper>
)

const WatchLaterItemWrapper = styled.div`
    margin: 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 28%;

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

export default Home;