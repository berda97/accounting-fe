import React, { useState } from "react";
import axios from "axios";

import '../Login.css';
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {updateToken}= useAuth();
   const navigate = useNavigate();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = () => {
    const data = {
      Email: email,
      Password: password,
    };

    const url = "https://localhost:7234/api/authentication/login";
    axios.post(url, data).then((response) => {
      updateToken(response.data.value);
     navigate('/users');

    }).catch((error) => {
      alert(error);
      alert('Neuspešno logovanje. Pokušajte ponovo.');
    })
  };
  const handleRegister =()=>{
    navigate('/registration');
  }

  return (
    <>
    
    <div className="login-container">
      <div className="container login-form">
        <div className="login-title">Login</div>
        <label>Email</label>
        <input
          type="text"
          id="textEmail"
          placeholder="Enter Email"
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          id="textPassword"
          placeholder="Enter Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
      </div>  
      
      <span className="reg-text" onClick={handleRegister}>
  Don't have an account? Register here
</span>
      </>
  );
}

export default Login;