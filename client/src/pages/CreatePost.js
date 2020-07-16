import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData : []
        }
    }

     async componentDidMount() {
        const { match : { params }} = this.props;
        const token = localStorage.getItem('token');
        await axios.get(`/post/${params.slug}`, {
            headers : {authorization : token}
        }).then(res => {
            this.setState({postData : res.data[0]});
        })

        console.log(this.state.postData)
    }

    render() {
        const { postData } = this.state;
        return(
      <div dangerouslySetInnerHTML={{ __html: postData.content}} />
        )
    }
}

export default CreatePost;