import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../Registration.css";

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSave = () => {
    const data = {
      Email: email,
      Password: password,
    };

    const url = 'https://localhost:7234/api/authentication/register';

    axios.post(url, data)
      .then((response) => {
        console.log('Registration successful:', response.data);
        alert('Uspešno ste se registrovali!');
        navigate('/users');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        alert('Neuspešna registracija. Pokušajte ponovo.');
      });
  };

  return (

    <div className="wrapper">
      <div className="container">
        <div className="registration-title">Registration</div>
        <label>Email</label>
        <input
          type="text"
          id="textEmail"
          placeholder="Enter Email"
          onChange={handleEmailChange}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          id="textPassword"
          placeholder="Enter Password"
          onChange={handlePasswordChange}
        />
        <br />
        <button className="button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Registration;