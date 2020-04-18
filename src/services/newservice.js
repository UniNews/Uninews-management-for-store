import { API_URL } from '@/config/environments'
import axios from 'axios'

export default {
    getAllNews: () => {
        return axios.get(`${API_URL}/articles/news`)
    },
    getNewsById: (id) => {
        return axios.get(`${API_URL}/articles/${id}`)
    },
    postNews: async (data) => {
        const result = await axios.post(`${API_URL}/articles`,data)
        return result
    },
    uploadNewsImage: (formData) => {
        return axios.post(`${API_URL}/images`, formData);
    },
    getAllCommunity: () => {
        return axios.get(`${API_URL}/articles/communities`)
    },
    getCommentsById: (id) => {
        const data = axios.get(`${API_URL}/articles/${id}/comments`)
        return data
    },
    deleteArticles: (id) => {
        const data = axios.delete(`${API_URL}/articles/${id}`)
        return data
    },
    deleteComment:(id, cid)=> {
        const data = axios.delete(`${API_URL}/articles/${id}/comments/${cid}`)
        return data
    }
}