import { Container, Dropdown } from "react-bootstrap";

const Cabezal = (props) => {

    return(
        <div style={{background: props.theme.primaryColor, color: "#f1f1f1"}}>
           <Container fluid style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '8vh'}}>
                <h2><b>Microb UY</b> 1.0.0</h2>
                <div style={{display: "flex", alignItems: 'center'}}>
                    <i className="fa fa-user me-3" style={{fontSize:'30px'}}></i>
                    <h3 className="me-4">Admin</h3>
                    <Dropdown>
                        <style>
                            {`
                                .dropdown-toggle {
                                    background: none;
                                    border: none;
                                    padding: 0;
                                    color: inherit;
                                }
                                .dropdown-toggle:focus {
                                    outline: none;
                                    
                                }
                                .dropdown-toggle:hover {
                                    background: none;
                                }
                                .dropdown-toggle::after {
                                    display: none;
                                }
                            `}
                        </style>
                        <Dropdown.Toggle id="dropdown-basic">
                            <i className="fa fa-cog" style={{fontSize:'30px'}}></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#action1">Opción 1</Dropdown.Item>
                            <Dropdown.Item href="#action2">Opción 2</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#action3">Opción 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container> 
        </div>
    );
}

export default Cabezal