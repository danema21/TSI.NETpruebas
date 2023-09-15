import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import DashBoard from './components/pages/dashboard/DashBoard';

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
        <Route path='/TSI.NETpruebas' element={<DashBoard theme={selectedTheme}/>}/>
        <Route path='/ejemplo' element={""}/>
        <Route path='/ejemplo2' element={""}/>
      </Routes>
    </div>
  );
}

export default App;
