import React, {useContext} from 'react';
import './App.css';
import Login from './Components/Login';
import Header from './Components/Header';
import SignupForm from './Components/SignupForm';
import { Route, Routes } from "react-router-dom";
import AdminDashboard from './Components/AdminDashboard';
import AuthContext from './context/AuthProvider';
import Home from './Components/Home';
import LoginUser from './Components/LoginUser';
import SignupFormUser from './Components/SignupFormUser';

function App() {

  const{auth} = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login_user' element={<LoginUser />} />
        <Route path='/login_admin' element={<Login />} />

        <Route path='/signup_user' element={<SignupFormUser/>} />
           {/* <Login /> */}
        <Route path='/signup' element={<SignupForm />} />
        {/* <Route path='/course' element={<Course />} /> */}
        <Route path='/dashboard' element={<AdminDashboard />} />
        {/* <Route path='/editStudent' element={<AdminDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
