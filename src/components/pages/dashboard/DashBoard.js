import { useEffect, useState } from "react";
import { Container, Button, Form, FormControl, Row, Col } from "react-bootstrap";
import MyAppServices from "../../../services/MyAppServices";
import { collection, addDoc, doc, onSnapshot, getDocs, serverTimestamp, orderBy, query, limit, QuerySnapshot } from "firebase/firestore"; 

const Post = (props) => {
    return(
        <Container style={{
            backgroundColor: "#464b4f",
            color: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            margin: "0 auto",
            marginTop: "10px",
            maxWidth: "70%",
            wordWrap: "break-word",
        }}>
            <Row>
                <Col>{props.post.message}</Col>
                <Col>{props.post.date?.toString()}</Col>
            </Row>
        </Container>
    );
}

const DashBoard = (props) => {
    const [msg, setMsg] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => { 
        const q = query(
            collection(props.db, "Messages"),
            orderBy("timestamp", "desc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach(doc => {
                fetchedMessages.push({...doc.data(), id: doc.id})
            });

            const sortedMessages = fetchedMessages.sort(
                (a, b) => b.timestamp - a.timestamp
            );
            setPosts(sortedMessages);
        });

        return () => unsubscribe;
    }, [props.db]);

    const sendMessage = async () => {
        console.log(msg);
        if(msg.trim() === ""){
            alert("ingrese un mensaje valido");
            return;
        }
        await addDoc(collection(props.db, "Messages"), {
            message: msg,
            date: new Date().toLocaleDateString("en-GB"),
            timestamp: serverTimestamp()
        }).then(res => console.log("msg agregado con exito con id: " + res.id)).catch(e => console.log(e));
        setMsg("");
    }

    return(
        <>
            <Container fluid>
                <h1 className="text-center">CHAT</h1>
                <Form block style={{display: "flex"}}>
                    <FormControl onChange={(e) => setMsg(e.target.value)} type="text" placeholder="Escribir mensaje..." className="mr-sm-2 mt-2" value={msg}/>
                    <Button onClick={sendMessage} variant="outline" style={{backgroundColor: props.theme.secondaryColor, borderRadius: "20%"}} className='mt-2 me-2'>
                        <i className='fa fa-send' style={{fontSize: 'larger', fontWeight: 'bolder'}}></i>
                    </Button>
                </Form>

                {posts?.map((post) => (
                    <Post key={post.id} post={post}/>
                ))}
            </Container>
            <Button 
                variant="outline-light" 
                className="floating-button" 
                style={{
                    backgroundColor: props.theme.secondaryColor,
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    height: '50px',
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