import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import DashBoard from './components/pages/dashboard/DashBoard';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1vSenGDR8OscUr-ALyFxQphlzYolqBlc",
  authDomain: "fir-react-chat-e9cc9.firebaseapp.com",
  projectId: "fir-react-chat-e9cc9",
  storageBucket: "fir-react-chat-e9cc9.appspot.com",
  messagingSenderId: "229457770140",
  appId: "1:229457770140:web:8f6f2c9ea2f58d488b5f59"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const defaultTheme = {
  primaryColor: '#7a67f1',
  secondaryColor: '#6721a9',
  backgroundColor: '#f3f3f3',
  textColor: '#708090',
};

const darkTheme = {
  primaryColor: 'darkred',
  secondaryColor: 'brown',
  backgroundColor: '#1f1f1f',
  textColor: '#f1f1f1',
};



function App() {
  const selectedTheme = darkTheme;

  return (
    <div className="App" style={{backgroundColor: selectedTheme.backgroundColor, color: selectedTheme.textColor}}>
      <NavBar theme={selectedTheme}/>
      <Routes>
        <Route path='/TSI.NETpruebas' element={<DashBoard theme={selectedTheme} db={firestoreDB} auth={auth} provider={provider}/>}/>
        <Route path='/ejemplo' element={""}/>
        <Route path='/ejemplo2' element={""}/>
      </Routes>
    </div>
  );
}

export default App;
