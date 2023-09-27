import { useState } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css"
import Buscador from "../buscador/buscador";
import Cabezal from "../cabezal/Cabezal";


const NavBar = (props) => {
    const [active, setActive] = useState(1);

    return(
        <>
            <Cabezal theme={props.theme}/>
            <Navbar collapseOnSelect expand="sm" className="navbar-my-app" >
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Buscador theme={props.theme}/>
                            <Link style={{color: props.theme.textColor}} to={"./TSI.NETpruebas"} className={active === 1 ? "nav-link active selected-page" : "nav-link"} onClick={() => setActive(1)}>HOME</Link>
                            <Link style={{color: props.theme.textColor}} to={"./usuarios"} className={active === 2 ? "nav-link active selected-page" : "nav-link"} onClick={() => setActive(2)}>USUARIOS</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;