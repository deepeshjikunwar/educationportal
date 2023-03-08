import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import SidebarUser from './SidebarUser';
import '../CSS/AdminDashboard.css'
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
    <div className='dashboard'>
      <h1>User Dashboard</h1>
      <div className="dashboard-main">

        <aside className='dashboard-btns'>
          <SidebarUser />
        </aside>
        <div className='dashboard-content'>
          <Outlet />
          {/* <div className="dashboard-content-btns"> */}
      {/* <button onClick={() => { navigate("/editStudent") }} >Add Student</button> */}
      {/* <button onClick={() => { navigate("/courses") }}>Add Course</button> */}
          {/* </div> */}
        </div>
      </div>
      
    </div>
  );
}

export default UserDashboard;
