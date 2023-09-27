import http from "../http-common";

const getAllUsuarios = () => {
    return http.get(`/usuario`);
}

const getUsuario = (id) => {
    return http.get(`/usuario/${id}`);
}

const crearUsuario = (usuarioAcrear) => {
    return http.post(`/usuario`, usuarioAcrear);
}

const editarUsuario = (id, usuarioEditado) => {
    return http.put(`/usuario/${id}`, usuarioEditado);
}

const borrarUsuario = (id) => {
    return http.delete(`/usuario/${id}`);
}

const MyAppServices = {
    getAllUsuarios,
    getUsuario,
    crearUsuario,
    editarUsuario,
    borrarUsuario
}

export default MyAppServices;