import React, { useState,useContext } from 'react';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css'
import { toast } from 'react-toastify';
function CourseForm() {
  const  { auth,setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  // if(auth === null || auth === undefined) {
  //   toast.info("Not Authorized Login First",{autoClose:400});
  //   navigate('../');
  // }



  // const BASE_URL = '/admin/'+auth?.id+"/addCourse";
 

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    if(auth === null || auth === undefined) {
      toast.info("Not Authorized Login First",{autoClose:400});
      navigate('../');
    }
    try {
      const response = await axios.post(`/admin/${auth.id}/addCourse`,
        { title, startDate, endDate, capacity}
    );
    console.log("response :"+JSON.stringify(response));
    setTitle('')
    setStartDate('')
    setEndDate('')
    setCapacity('')
    navigate('../courses')
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
    <form className='login-form signup-form course-form' onSubmit={handleSubmit}>
      <h1 className='login-form-item login-form-heading'>Add New Course</h1>
      <div className="login-form-item">

      <label>
        Title:
      </label>
        <input required type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      </div>
     
      <div className="login-form-item">

      <label>
        Start Date:
      </label>
        <input required type="date" name="startDate" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} />
      </div>
 
      <div className="login-form-item">

      <label>
        End Date:
      </label>
        <input required type="date" name="endDate" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} />
      </div>
      
      <div className="login-form-item">

      <label>
        Capacity:
      </label>
        <input required type="number" name="capacity" value={capacity} onChange={(e)=>{setCapacity(e.target.value)}} />
      </div>
      
      <button  className='login-form-item add-course-submit' type="submit">Submit</button>
    </form>
  );
}
export default CourseForm;