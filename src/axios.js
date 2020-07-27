import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/',
})

export default instance
