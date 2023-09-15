import React from 'react';
import { Form, FormControl, Button, Container } from 'react-bootstrap';

const Buscador = (props) => {
  return (
    <Container fluid>
        <Form block style={{display: 'flex'}}>
            <Button variant="outline" style={{backgroundColor: props.theme.secondaryColor, borderRadius: "40%"}} className='mt-2 me-2'><i className='fa fa-search' style={{fontSize: 'larger', fontWeight: 'bolder'}}></i></Button>
            <FormControl type="text" placeholder="Buscar..." className="mr-sm-2 mt-2" />
        </Form>
    </Container>
  );
}

export default Buscador;