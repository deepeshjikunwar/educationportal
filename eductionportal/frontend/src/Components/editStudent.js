import React, { useState ,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../Api/axios';
import '../CSS/Login.css'
function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const USERS_URL = "/users/"+id;
  console.log("ID ------- "+id);
  const [student, setStudent] = useState(null);
  // {firstName:"abhi",lastName:"kam",age:"34",email:"email"}
  const[ firstName, setFirstName] = useState();
  const[ lastName, setLastName] = useState();
  const[ email, setEmail] = useState();
  const[ password, setPassword] = useState();

  const getData = async () => {

    try {
      console.log("In TRY of GEWT DATA : "+USERS_URL);
      const response = await axios.get(USERS_URL);
      // console.log(response.data)
      console.log("Student In Edit : "+JSON.stringify(response.data))
      setStudent(response.data)
      // setFirstName(student.firstName)
      // setLastName(student.lastName)
      // setEmail(student.email)
      // console.log("Fi Name :"+student?.firstName);
      
    }catch(e){
      console.log("In Error of Edit Student : "+e);
    }
  }
  
  useEffect(() => {
    // console.log("Student : "+student);
    if(student === null || student === undefined) {getData()};
  });



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log("Edited in Edit.js :"+firstName)
    
    try {
      const response = await axios.put(USERS_URL, {
        firstName, lastName, email
      }
      );
      // console.log(response.data)
      setStudent(response.data)
      navigate('../students')
      console.log("Student In Edit : "+JSON.stringify(student))
    }catch(e){
      console.log("In Error of Edit Student : "+e);
    }

  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h2 className='login-form-item login-form-heading' >Edit Student</h2>
      <div className="login-form-item">

      <label>
        First Name:
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e)=>{setFirstName(e.target.value)}}
          placeholder={student?.firstName}
          required
          />
          </div>

          <div className="login-form-item">

      <label>
        Last Name:
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e)=>{setLastName(e.target.value)}}
          placeholder={student?.lastName}
          required
          />
          </div>
          <div className="login-form-item">

      <label>
        Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder={student?.email}
          required
          />
          </div>
      <button className='login-form-item login-form-submit-edit' type="submit">Apply Changes</button>
    </form>
  );
}

export default EditStudent;
