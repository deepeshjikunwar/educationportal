import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'
// import Course from './Course';
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
      {/* <Course title={"Advance Java"} description={"Detailed Course"} students={"Alot"}/> */}


      {/* <Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="Sample"
    src="https://picsum.photos/300/200"
  />
  <CardBody>
    <CardTitle tag="h5">
      Card title
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Card subtitle
    </CardSubtitle>
    <CardText>
      Some quick example text to build on the card title and make up the bulk of the card‘s content.
    </CardText>
    <Button>
      Button
    </Button>
  </CardBody>
</Card> */}

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
