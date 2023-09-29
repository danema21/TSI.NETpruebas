import { useEffect, useState } from "react";
import MyAppServices from "../../../services/MyAppServices";
import { Button, Card, Container, Form, FormControl} from "react-bootstrap";

const Usuarios = (props) => {
    const [usuarios, setUsuarios] = useState([]);
    const [id, setId] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [hash, setHash] = useState(null);
    const [salt, setSalt] = useState(null);
    const [ocupacion, setOcupacion] = useState(null);
    const [ubicacion, setUbicacion] = useState(null);
    const [biografia, setBiografia] = useState(null);
    const [rol, setRol] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [modo, setModo] = useState("CREAR");
    const [estado, setEstado] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [search, setSearch] = useState("");

    useEffect(() => {
        MyAppServices.getAllUsuarios(page, pageSize).then(response => {
            console.log(response.data);
            setUsuarios(response.data);
        }).catch(e => console.log("error al conseguir los usuarios", e));
    } , [page, pageSize]);

    const handleEditar = (usuario) => {
        setId(usuario.id);
        setModo("EDITAR");
        setNickname(usuario.nickname);
        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setHash(usuario.hash);
        setSalt(usuario.salt);
        setOcupacion(usuario.ocupacion);
        setUbicacion(usuario.ubicacion);
        setBiografia(usuario.biografia);
        setRol(usuario.rol);
        setFechaNacimiento(usuario.fechaNacimiento);
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }

    const handleConfirmar = (e) => {
        e.preventDefault();
        if(modo === "CREAR"){
            const usuarioAcrear = {
                nickname: nickname,
                nombre: nombre,
                password: password,
                email: email,
                ocupacion: ocupacion,
                ubicacion: ubicacion,
                biografia: biografia,
                rol: rol,
                fechaNacimiento: fechaNacimiento
            }
            MyAppServices.crearUsuario(usuarioAcrear).then(response => {
                console.log("usuario creado con exito", response.data);
                setEstado("Exito");
                window.setTimeout(() => window.location.reload(), 1000);
            }).catch(e => {
                console.log("no se pudo crear el usuario", e)
                setEstado("Error");
            });
        }else if(modo === "EDITAR"){
            const usuarioEditado = {
                nickname: nickname,
                nombre: nombre,
                email: email,
                hash: hash,
                salt: salt,
                ocupacion: ocupacion,
                ubicacion: ubicacion,
                biografia: biografia,
                rol: rol,
                fechaNacimiento: fechaNacimiento
            }
            MyAppServices.editarUsuario(id, usuarioEditado).then(response => {
                console.log("usuario editado con exito", response.data);
                setEstado("Exito");
                window.setTimeout(() => window.location.reload(), 1000);
            }).catch(e => {
                console.log("no se pudo editar el usuario", e)
                setEstado("Error");
            });
        }
    }

    const handleBorrar = (id) => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        MyAppServices.borrarUsuario(id).then(response => {
            console.log("usuario borrado con exito", response.data);
            setEstado("Exito");
            window.setTimeout(() => window.location.reload(), 1000);
        }).catch(e => {
            console.log("no se pudo borrar el usuario", e)
            setEstado("Error");
        });

    }

    const handleSearchUser = () => {
        MyAppServices.buscarUsuario(search).then(response => {
            console.log(response.data);
            setUsuarios(response.data);
        }).catch(e => console.log("error al buscar", e));
    }

    const handleNextPage = () => {
        (usuarios.length !== 0) ? setPage(page + 1) : console.log("no hay mas registros en la siguiente pagina");
    }

    const handlePrevPage = () => {
        (page > 1) ? setPage(page - 1) : console.log("no se puede retroceder mas");
    }

    return(
        <Container fluid>
            <h2 className="text-center">---{estado}---</h2>
            <Card className="mt-4 mb-4">
                <Card.Header>
                    <Card.Title>{modo} USUARIO {id}</Card.Title>
                </Card.Header>
                
                <Form action={handleConfirmar}>
                    <Card.Body>
                            <Form.Control type="text" placeholder="nickname..." onChange={(e) => setNickname(e.target.value)} value={nickname} required/>    
                            <Form.Control type="text" placeholder="nombre..." onChange={(e) => setNombre(e.target.value)} value={nombre} required/>
                            <Form.Control type="text" placeholder="email..." onChange={(e) => setEmail(e.target.value)} value={email} required/>
                            {modo === "CREAR" ? <Form.Control type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} required/> : null}
                            <Form.Control type="text" placeholder="ocupacion..." onChange={(e) => setOcupacion(e.target.value)} value={ocupacion}/>
                            <Form.Control type="text" placeholder="ubicacion..." onChange={(e) => setUbicacion(e.target.value)} value={ubicacion}/>
                            <Form.Control type="text" placeholder="biografia..." onChange={(e) => setBiografia(e.target.value)} value={biografia}/>
                            <Form.Select onChange={(e) => setRol(e.target.value)} value={rol} required>
                                <option value="ADMIN_PLATAFORMA">ADMIN_PLATAFORMA</option>
                                <option value="ADMIN_INSTANCIA">ADMIN_INSTANCIA</option>
                                <option value="MODERADOR_INSTANCIA">MODERADOR_INSTANCIA</option>
                                <option value="USUARIO_INSTANCIA">USUARIO_INSTANCIA</option>
                            </Form.Select>
                            <Form.Control type="text" placeholder="fecha de nacimiento(yyyy-MM-ddThh:mi:ss)" onChange={(e) => setFechaNacimiento(e.target.value)} value={fechaNacimiento} required/>
                    
                    </Card.Body>
                    <Card.Footer>
                        <Button type="submit" variant="success" onClick={handleConfirmar}>CONFIRMAR</Button>
                        {modo === "EDITAR" ? <Button variant="secondary" onClick={() => {setModo("CREAR"); setId(null)}}>CANCELAR</Button> : null}
                    </Card.Footer>
                </Form>
            </Card>
            <Container className="mb-2">
                <Form block style={{display: 'flex'}}>
                    <Button onClick={handleSearchUser} variant="outline" style={{backgroundColor: props.theme.secondaryColor, borderRadius: "40%"}} className='mt-2 me-2'><i className='fa fa-search' style={{fontSize: 'larger', fontWeight: 'bolder'}}></i></Button>
                    <FormControl onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Buscar..." className="mr-sm-2 mt-2" />
                </Form>
            </Container>
            {usuarios.map(usuario => 
                <Card key={usuario.id} className="mb-4">
                    <Card.Header>
                        <Card.Title>{usuario.nickname} ID-{usuario.id}</Card.Title>
                        <Button variant="secondary" onClick={() => handleEditar(usuario)}>EDITAR</Button>
                        <Button variant="danger" onClick={() => handleBorrar(usuario.id)}>BORRAR</Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>NOMBRE: {usuario.nombre}</Card.Text>
                        <Card.Text>EMAIL: {usuario.email}</Card.Text>
                        <Card.Text>OCUPACION: {usuario.ocupacion}</Card.Text>
                        <Card.Text>UBICACION: {usuario.ubicacion}</Card.Text>
                        <Card.Text>BIOGRAFIA: {usuario.biografia}</Card.Text>
                        <Card.Text>ROL: {usuario.rol}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        FECHA DE NACIMIENTO: {usuario.fechaNacimiento} 
                    </Card.Footer>
                </Card>
            )}
            <Container fluid style={{backgroundColor: props.theme.primaryColor, display: "flex", justifyContent: "space-between"}}>
                <Button onClick={handlePrevPage} variant="outline">ANTERIOR</Button>
                <Button onClick={handleNextPage} variant="outline">SIGUIENTE</Button>
            </Container>
        </Container>
    );
}

export default Usuarios;