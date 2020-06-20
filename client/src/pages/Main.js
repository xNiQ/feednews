import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

class Main extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <div>
            <Navbar/>
            <h1>hello from Main!</h1>
            </div>
        )
    }
}

export default Main;