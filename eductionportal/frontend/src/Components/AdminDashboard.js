import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import axios from '../Api/axios';
// import '../CSS/AdminDashboard.css'
import CourseForm from './CourseForm';
import CourseBox from './CourseBox';
import Sidebar from './Sidebar'
import { Drawer, Layout, FloatButton } from 'antd'
import AuthContext from '../context/AuthProvider';

const { Sider, Content } = Layout;

function AdminDashboard() {

  const USERS_URL = "users";
  // const { drawerStatus, setDrawerStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  // state to hold the list of students
  const [students, setStudents] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 20 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 21 },
    { id: 3, firstName: 'Bob', lastName: 'Smith', email: 22 },
  ]);

  const [drawerStatus, setDrawerStatus] = useState(false);

  const onClose = () => {
    setDrawerStatus(false);
  };
  const onOpen = () => {
    setDrawerStatus(true);
  }

  const getData = async () => {

    try {
      const response = await axios.get(USERS_URL
      );
      console.log(response.data)
      setStudents(response.data)
    } catch (e) {
    }
  }

  useEffect(() => {
    getData();
  }, []);



  // function to delete a student
  const handleDeleteStudent = (id) => {
    const newStudents = students.filter((student) => student.id !== id);
    setStudents(newStudents);
  };

  // function to edit a student
  const handleEditStudent = (id) => {
    // implementation for editing a student
    navigate(`/edit_student/${id}`)
  };

  return (
    <Layout hasSider className='dashboard'>
    
  


          <Sidebar Sider={Sider} />
          <Content  style={
      {
      textAlign: 'center',
      minHeight: 120,
      lineHeight: '20px',
      width:1200,
      marginLeft:180,
      color: '#fff',
      
      backgroundColor: '#fff',}} className="course">

          <Outlet Content={Content} />
      </Content>
          {/* <div className="dashboard-content-btns"> */}
          {/* <button onClick={() => { navigate("/editStudent") }} >Add Student</button> */}
          {/* <button onClick={() => { navigate("/courses") }}>Add Course</button> */}
          {/* </div> */}
      
        <Drawer title="Queries Section" placement="right" onClose={onClose} open={drawerStatus}>
        <p>Check Queries</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer> 
      <FloatButton onClick={onOpen}>Ask Queries</FloatButton>
    </Layout>





  );
};

export default AdminDashboard;