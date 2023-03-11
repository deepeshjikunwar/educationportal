import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sidebar.css';
function Sidebar({Sider}){
    const navigate = useNavigate(); 
    return(

    <Sider style={
            {
            overflow: 'auto',
            height: '80vh',
            position: 'fixed',
            left: 0,
            top: 80,
            bottom: 0,
            }
          }  className="sidebar">
   <button className='sidebar-btns' onClick={()=>{navigate('courseStudent')}}> Course Students</button>
    <button className='sidebar-btns' onClick={()=>{navigate('courses')}}>Course List</button>
    <button className='sidebar-btns' onClick={()=>{navigate('addAssignment')}}>Add Student</button>
    <button className='sidebar-btns' onClick={() => { navigate("addCourse") }}>Add Course</button>
    <button className='sidebar-btns' onClick={()=>{navigate('students')}}> All Student List</button>
    </Sider>
    
    )

}
export default Sidebar;