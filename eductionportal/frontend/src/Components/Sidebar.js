import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sidebar.css';
function Sidebar(){
    const navigate = useNavigate(); 
    return(
    
    <div  className="sidebar">
   
    <button className='sidebar-btns' onClick={()=>{navigate('students')}}>Student List</button><br />
    <button className='sidebar-btns' onClick={()=>{navigate('courses')}}>Course List</button><br />
    <button className='sidebar-btns' onClick={() => { navigate("/editStudent") }} >Add Student</button>
    <button className='sidebar-btns' onClick={() => { navigate("/courses") }}>Add Course</button>
    </div>
    
    )

}
export default Sidebar;