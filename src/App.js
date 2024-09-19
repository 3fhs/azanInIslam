import React from 'react';
import './App.css';
import Main from './componentes/mainComponent/Main';
import { Container } from '@mui/material';
import Quran from './componentes/mainComponent/Quran';
import Footer from './componentes/mainComponent/Footer';
import Header from './componentes/header/Header';

function App() {
  return (
    <div className="App" style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      minHeight:"100vh",
      position:"relative",
      flexDirection:"column",
    }}>
      <Header/>
      <div> 
        <Container maxWidth="xl" style={{padding:"0"}}>
            <Main/>    
        </Container>
      </div>
      <Quran/>
      <Footer/>
    </div>
  );
}

export default App;
