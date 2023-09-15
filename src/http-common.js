import axios from 'axios';

export default axios.create({
    baseURL: "https://localhost:7197/api",
    headers: {
        "Content-Type": "application/json"
    }
})