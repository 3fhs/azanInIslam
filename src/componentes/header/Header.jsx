import React from 'react';
import logo from "../../image/logo-azana.png";

function Header() {
  return (
    <div style={{width:"100%", height:"80px", backgroundColor:"black", marginBottom:"20px"}}>
        <div style={{position:"absolute", top:"0", width:"80px", height:"80px", right:"0", borderRadius:"50% 0 0 50%", overflow:"hidden", boxShadow:"0 0 2px 3px #7777"}}>
          <img src={logo} alt='logo web site' style={{width:"100%", borderRadius:"50% 0 0 50%"}} />
        </div>
        <div>
            <h1 style={{color:"white", textAlign:"center", padding:"12px"}}> بسم الله الرحمن الرحيم </h1>
        </div>
        <div style={{position:"absolute", top:"0", width:"80px", height:"80px", left:"0", borderRadius:"0 50% 50% 0", overflow:"hidden", boxShadow:"0 0 2px 3px #7777"}}>
          <img src={logo} alt='logo web site' style={{width:"100%", borderRadius:"0 50% 50% 0"}} />
        </div>
    </div>
  )
}

export default Header