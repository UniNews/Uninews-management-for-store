import { API_URL } from '@/config/environments'
import axios from 'axios'

export default {
    login: async (email, password) => {
        const json = {
            username: email,
            password: password
        }
        const data = await axios.post(`${API_URL}/signin`, json, {
            headers: { 'Content-Type': 'application/json' }
        })
        return data
    },
    getProfile: () => {
        return axios.get(`${API_URL}/profile`)
    },
    getNormalUserById: (id) => {
        return axios.get(`${API_URL}/users/${id}/normal`).then(response => response.data)
            .catch(error => error)
    },
    getUserById: (id) => {
        return axios.get(`${API_URL}/users/${id}`).then(response => response.data)
            .catch(error => error)
    },
    followUserById: (id) => {
        return axios.post(`${API_URL}/users/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
    },
    getAllUser: ()=> {
        return axios.get(`${API_URL}/users`)
    },
    putUser:(json,uid) => {
        return axios.put(`${API_URL}/users/${uid}`, json,{
            headers: { 'Content-Type': 'application/json' }
        })
    },
    banUser: (uid) => {
        return axios.post(`${API_URL}/users/${uid}/ban`,{
            headers: { 'Content-Type': 'application/json' }
        });
    },
    unBanUser: (uid) => {
        return axios.delete(`${API_URL}/users/${uid}/ban`,{
            headers: { 'Content-Type': 'application/json' }
        });
    },
    getMyArticle: async (id) => {
        const data = await axios.get(`${API_URL}/users/${id}/articles`)
        return data
    }
}