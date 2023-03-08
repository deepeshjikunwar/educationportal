import React, { useState,useContext } from 'react';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
// import '../CSS/CourseForm.css'
import { toast } from 'react-toastify';
function CourseForm() {
  const  { auth,setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  if(auth === null || auth === undefined) {
    toast("Not Authorized",{autoClose:200});
    navigate('../');
  }



  const BASE_URL = '/admin/'+auth.id+"/addCourse";
 

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(BASE_URL,
        { title, startDate, endDate, capacity}
    );
    console.log("response :"+JSON.stringify(response));
    setTitle('')
    setStartDate('')
    setEndDate('')
    setCapacity('')
      let toAdd = window.confirm("Do you want to add another course ?");
      if(toAdd === false) navigate('../admin_dashboard')
    } catch(err){
      if (!err) {
        console.log('No Server Response');
      } else if (err === 401) {
        console.log('Unauthorized');
        } else {
        // setErrMsg(err);
        console.log(err);
      }
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      </label>
      <br />
      <label>
        Start Date:
        <input type="date" name="startDate" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} />
      </label>
      <br />
      <label>
        End Date:
        <input type="date" name="endDate" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} />
      </label>
      <br />
      <label>
        Capacity:
        <input type="number" name="capacity" value={capacity} onChange={(e)=>{setCapacity(e.target.value)}} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
export default CourseForm;