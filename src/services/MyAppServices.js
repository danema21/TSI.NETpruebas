import http from "../http-common";

const getAll = () => {
    return http.get(`https://localhost:7197/api/usuario`);
}

const MyAppServices = {
    getAll
}

export default MyAppServices;