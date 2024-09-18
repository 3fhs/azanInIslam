import React from 'react';
import './App.css';
import Main from './componentes/mainComponent/Main';
import { Container } from '@mui/material';
import logo from "./image/logo-azana.png";

function App() {
  return (
    <div className="App" style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      minHeight:"100vh",
      position:"relative",
    }}>
      <div style={{position:"absolute", top:"0", width:"80px", height:"80px", right:"0", borderRadius:"50% 0 0 50%", overflow:"hidden", boxShadow:"0 0 2px 3px #7777"}}>
          <img src={logo} alt='logo web site' style={{width:"100%", borderRadius:"50% 0 0 50%"}} />
      </div>
      <div> 
        <Container maxWidth="xl" style={{padding:"0"}}>
            <Main/>    
        </Container>
      </div>
    </div>
  );
}

export default App;
