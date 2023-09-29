import http from "../http-common";

const getAllUsuarios = (page, size) => {
    return http.get(`/usuario?paginaActual=${page}&elementosPorPagina=${size}`);
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

const buscarUsuario = (email) => {
    return http.get(`usuario/buscar/${email}`);
}

const MyAppServices = {
    getAllUsuarios,
    getUsuario,
    crearUsuario,
    editarUsuario,
    borrarUsuario,
    buscarUsuario
}

export default MyAppServices;