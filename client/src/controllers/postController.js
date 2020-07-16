import axios from 'axios';

export const deletePost = (slug) => {
    axios.post(`/post/delete/${slug}`, {
        headers : { 'authorization' : localStorage.getItem('token')}
    });
}