import React, { useState } from 'react';

function AddStudentForm({ student }) {


  const[ firstName, setFirstName] = useState(student.firstName);
  const[ lastName, setLastName] = useState(student.lastName);
  const[ age, setAge] = useState(student.age);
  const[ email, setEmail] = useState(student.email);
  const[ password, setPassword] = useState(student.password);


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
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          required
        />
      </label>
      <button type="submit">Apply Changes</button>
    </form>
  );
}

export default AddStudentForm;
