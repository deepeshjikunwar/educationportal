import React, { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../Api/axios';
function EditStudent() {
  const USERS_URL = "users";
  const { id } = useParams();
  const [student, setStudent] = useState({});
  // {firstName:"abhi",lastName:"kam",age:"34",email:"email"}
  const[ firstName, setFirstName] = useState();
  const[ lastName, setLastName] = useState();
  const[ age, setAge] = useState();
  const[ email, setEmail] = useState();
  const[ password, setPassword] = useState();

  const getData = async () => {

    try {
      const response = await axios.get(USERS_URL+"/"+id
        );
      // console.log(response.data)
      setStudent(response.data)
      console.log(student)
      setFirstName(student.firstName)
      setLastName(student.lastName)
      setAge(student.age)
      setEmail(student.email)
      setPassword(student.password)
    }catch(e){
    }
  }
  
  useEffect(() => {
    getData();
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();


  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e)=>{setFirstName(e.target.value)}}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e)=>{setLastName(e.target.value)}}
          required
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={age}
          onChange={(e)=>{setAge(e.target.value)}}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          required
        />
      </label>
      <button type="submit">Apply Changes</button>
    </form>
  );
}

export default EditStudent;
