import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.100.24:3000'
})

export default api;