import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import MyAppServices from "../../../services/MyAppServices";

const DashBoard = (props) => {
    useEffect(() => {
        MyAppServices.getAll().then(res => {
            console.log(res.data)
        }).catch(
            console.log("no funciono la api...")
        )
    }, []); 

    return(
        <>
            <Container fluid>
                <h1 className="text-center">Hola Mundo</h1>
            </Container>
            <Button 
                variant="outline-light" 
                className="floating-button" 
                style={{
                    backgroundColor: props.theme.secondaryColor,
                    position: 'fixed',
                    bottom: '20px', /* Ajusta la distancia desde la parte inferior de la página según tus preferencias */
                    right: '20px',  /* Ajusta el ancho del botón según tus preferencias */
                    height: '50px', /* Ajusta la altura del botón según tus preferencias */
                    border:'none',
                    fontSize: '18px',
                    borderRadius: '30px',
                    boxShadow: 'box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5)'
                    }}>
                <b>+</b> Nuevo Foro
            </Button>
        </>
    );
}

export default DashBoard;