import { Container } from "react-bootstrap";
import Cabezal from "../../cabezal/Cabezal";

const CrearInstancia = () => {

    return(
        <>
            <Cabezal/>
            <Container fluid>
                <h1 className="text-center">Crear Instancia</h1>
            </Container>
        </>
    );
}

export default CrearInstancia;