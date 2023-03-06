import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function UserDashboard() {

    const navigate = useNavigate();
  // state to hold the list of students
  const [students, setStudents] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', age: 20 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', age: 21 },
    { id: 3, firstName: 'Bob', lastName: 'Smith', age: 22 },
  ]);

  // function to delete a student
  const handleDeleteStudent = (id) => {
    const newStudents = students.filter((student) => student.id !== id);
    setStudents(newStudents);
  };

  // function to edit a student
  const handleEditStudent = (id) => {
    // implementation for editing a student
  };

  return (
    <div className='container'>
      <h1>User Dashboard</h1>
      {/* <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => handleEditStudent(student.id)}>Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>{navigate("/editStudent")}}>Add Student</button> */}
    </div>
  );
}

export default UserDashboard;
