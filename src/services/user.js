import { api } from "configs/api"
import { requestHandler } from "helpers/helper";

const getProfile = () => requestHandler(() => api.get('user/whoami')).then(res => res || false);

const addPost = formData => requestHandler(() => api.post('post/create', formData, { headers: { "Content-Type": 'multipart/form-data' } }));

const getUserPosts = () => requestHandler(() => api.get('post/my'));

const deletePost = id => requestHandler(() => api.delete(`post/delete/${id}`));

const getAllPosts = () => requestHandler(() => api.get('/'));

const getPost = ({ queryKey }) => requestHandler(() => api.get(`post/${queryKey[1]}`));


export { getProfile, addPost, getUserPosts, deletePost, getAllPosts, getPost }