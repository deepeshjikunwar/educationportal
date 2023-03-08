import React,{useState} from 'react'

function AdminStudentList() {
    const [students, setStudents] = useState([{id:"2",firstName:"dsd",lastName:"sd",email:"ee"}])

    const handleEditStudent =()=>{}
    const handleDeleteStudent =()=>{}
  return (
    <table className='table'> 
    <h1>In Student Listttt</h1>
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
  )
}

export default AdminStudentList