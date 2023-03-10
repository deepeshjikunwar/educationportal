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
   
    <button className='sidebar-btns' onClick={()=>{navigate('students')}}>Student List</button><br />
    <button className='sidebar-btns' onClick={()=>{navigate('courses')}}>Course List</button><br />
    <button className='sidebar-btns'  >Add Student</button>
    <button className='sidebar-btns' onClick={() => { navigate("addCourse") }}>Add Course</button>
    </Sider>
    
    )

}
export default Sidebar;