import React, { useState, useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import axios from '../Api/axios';
import '../CSS/AdminDashboard.css'
import CourseForm from './CourseForm';
import CourseBox from './CourseBox';
import Sidebar from './Sidebar'
import {Layout} from 'antd'
const {Sider, Content} = Layout;
function AdminDashboard() {

  const USERS_URL = "users";

  const navigate = useNavigate();
  // state to hold the list of students
  const [students, setStudents] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 20 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 21 },
    { id: 3, firstName: 'Bob', lastName: 'Smith', email: 22 },
  ]);



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
    <Layout className='dashboard'>
      <h1>Admin Dashboard</h1>
      <div className="dashboard-main">

        <Sider className='dashboard-btns'>
          <Sidebar />
        </Sider>
        <Content className='dashboard-content' style={{"display":"grid" , "placeContent" : "center"}}>
          <Outlet />
          {/* <div className="dashboard-content-btns"> */}
      {/* <button onClick={() => { navigate("/editStudent") }} >Add Student</button> */}
      {/* <button onClick={() => { navigate("/courses") }}>Add Course</button> */}
          {/* </div> */}
        </Content>
      </div>
  </Layout>





  );
};

export default AdminDashboard;