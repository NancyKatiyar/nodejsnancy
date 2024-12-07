import React, { useState } from 'react'
import "./Join.css"
import {Link } from 'react-router-dom'

let user;

const senUser =()=>{
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value= "";
}
function Join() {
    const [name,setName] = useState("")

  return (
    <div className='joinPage'>
     <div className='JoinContainer'>
        <h1>C Chat</h1>
         <input type='text' id='joinInput' placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/>
         <Link onClick={(event)=> !name ? event.preventDefault():null} to="/chat"><button className='joinBtn' onClick={senUser}>Login</button></Link> 
     </div>
    </div>
  )
}

export default Join
export {user}
