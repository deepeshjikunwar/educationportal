import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../Api/axios';
import '../CSS/AdminDashboard.css'
// import Course from './Course';
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
  }catch(e){
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
    <div className='container'>
      <h1>Admin Dashboard</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleEditStudent(student.id)}>Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>{navigate("/editStudent")}}>Add Student</button>
    </div>
  );
}

export default AdminDashboard;
