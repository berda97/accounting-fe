
import './App.css';
import React from 'react';
import Routes from './routes/index';
import AuthProvider from './provider/authProvider';

function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
export default App;