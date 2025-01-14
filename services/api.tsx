import axios from 'axios'
import { BACKEND_URL } from '../constants/backend_url'

const Api = axios.create({
    baseURL: BACKEND_URL
})

export default Api