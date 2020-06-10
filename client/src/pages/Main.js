import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <div>
            <h1>hello from Main!</h1>
            <Link to="/login-to-admin-panel">elo</Link>
            </div>
        )
    }
}

export default Main;