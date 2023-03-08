import React,{useState, useEffect} from 'react'
import axios from '../Api/axios';
import '../CSS/AdminStudentList.css'
function AdminStudentList() {
    const [students, setStudents] = useState(null)
    const USERS_URL = "users";
    const handleEditStudent =()=>{}
    const handleDeleteStudent =()=>{}


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
      if(students === null) getData();
    });

  return (
    <table className='dashboard-student'> 
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th colSpan={2}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {students ? students.map((student) => (
        <tr className='dashboard-student-row' key={student.id}>
        
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.email}</td>
          <td>
            <button onClick={() => handleEditStudent(student.id)}>Edit</button>
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </td>
        </tr>
      )) : null}
    </tbody>
  </table>
  )
}

export default AdminStudentList