import { useEffect, useState } from "react";
import { Container, Button, Form, FormControl, Row, Col, Image } from "react-bootstrap";
import { collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, limit } from "firebase/firestore"; 
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";

const Post = (props) => {
    return(
        <Container style={{
            backgroundColor: props.theme.primaryColor,
            color: "#fff",
            borderRadius: "10px",
            padding: "15px",
            margin: "10px auto",
            maxWidth: "80%",
            wordWrap: "break-word",
        }}>
            <Row xs={12}>
                <Col xs={4}>
                    <Row xs={3}>
                        <Image src={props.post.profilePic} fluid style={{minWidth: "80px"}}/>
                    </Row>
                    <Row xs={1}>
                        <div>{props.post.userName} </div>
                        <div>{props.post.email}</div>
                        <div><small>{props.post.date?.toString()}</small></div>
                    </Row>
                </Col>
                <Col xs={8} style={{border: "1px solid rgba(0,0,0,0.2)", borderRadius: "3px"}}>
                    <Row xs={8}>
                        <p>{props.post.message}</p>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

const DashBoard = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
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

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(msg);
        if(msg.trim() === ""){
            alert("ingrese un mensaje valido");
            return;
        }
        await addDoc(collection(props.db, "Messages"), {
            message: msg,
            date: new Date().toLocaleDateString("en-GB"),
            timestamp: serverTimestamp(),
            userName: loggedIn.displayName,
            email: loggedIn.email,
            profilePic: loggedIn.photoURL
        }).then(res => console.log("msg agregado con exito con id: " + res.id)).catch(e => console.log(e));
        setMsg("");
    }

    const logIn = () => {
        signInWithPopup(props.auth, props.provider).then(data => {
            localStorage.setItem("accessToken", data.accessToken);
            console.log("LOGEO:", data.user);
            setLoggedIn(data.user);
        }).catch(e => console.log(e));
    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <>
            {loggedIn ?
            <Container fluid>
                <Button onClick={logout} variant="outline" className="mt-4" style={{backgroundColor: props.theme.secondaryColor, borderRadius: "4px", fontWeight: "bolder", margin: "0 auto", display: "block"}}>LOG OUT</Button>
                <h1 className="text-center mt-3">CHAT</h1>
                <p className="text-center">Bienvenido/a {loggedIn.displayName}</p>
                <Form block style={{display: "flex"}} onSubmit={e => sendMessage(e)}>
                    <FormControl onChange={(e) => setMsg(e.target.value)} type="text" placeholder="Escribir mensaje..." className="mr-sm-2 mt-2" value={msg}/>
                    <Button type="submit" variant="outline" style={{backgroundColor: props.theme.secondaryColor, borderRadius: "20%"}} className='mt-2 me-2'>
                        <i className='fa fa-send' style={{fontSize: 'larger', fontWeight: 'bolder'}}></i>
                    </Button>
                </Form>

                {posts?.map((post) => (
                    <Post key={post.id} post={post} theme={props.theme}/>
                ))}
            </Container> : <GoogleButton onClick={logIn} style={{margin: "0 auto", marginTop: "30vh"}}>LOG IN</GoogleButton>}
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