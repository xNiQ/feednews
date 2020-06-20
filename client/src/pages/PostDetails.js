import React, { Component } from 'react';
import axios from 'axios';

class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData : []
        }
    }

     async componentDidMount() {
        const { match : { params }} = this.props;

        await axios.get(`/post/${params.slug}`).then(res => {
            this.setState({postData : res.data[0]});
        })

        console.log(this.state.postData)
    }

    render() {
        const { postData } = this.state;
        return(
            <div>
                {postData.map(node => {
                    const {_id, title, content, user} = node;
                    return {
                        _id,title,content,user
                    }
                })}
                
            </div>
        )
    }
}

export default PostDetails;