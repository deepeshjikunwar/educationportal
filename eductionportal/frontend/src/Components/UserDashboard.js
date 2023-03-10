import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import SidebarUser from './SidebarUser';
// import '../CSS/AdminDashboard.css'
import { Layout } from 'antd';
const {Sider,Content} = Layout;
// import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'
// import Course from './Course';
function UserDashboard() {
    const navigate = useNavigate();
    // const {auth} = useContext(AuthContext);
    // console.log(auth);
  // state to hold the list of students


  // function to delete a student
  const handleDeleteStudent = (id) => {

  };

  // function to edit a student
  const handleEditStudent = (id) => {
    // implementation for editing a student
  };

  return (
    <Layout hasSider className='dashboard'>
          <SidebarUser Sider={Sider}/>

        <div className='dashboard-content'>
        <Content  style={
      {
      textAlign: 'center',
      minHeight: 120,
      lineHeight: '20px',
      width:1200,
      marginLeft:120,
      color: '#fff',
      
      backgroundColor: '#fff',}} className="course">
          <Outlet />
      </Content>
          {/* <div className="dashboard-content-btns"> */}
      {/* <button onClick={() => { navigate("/editStudent") }} >Add Student</button> */}
      {/* <button onClick={() => { navigate("/courses") }}>Add Course</button> */}
          {/* </div> */}
        </div>
     
      
    </Layout>
  );
}

export default UserDashboard;
