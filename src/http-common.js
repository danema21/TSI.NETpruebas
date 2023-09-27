import axios from 'axios';

export default axios.create({
    baseURL: "https://localhost:7181/api",
    headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:3000"
    }
})