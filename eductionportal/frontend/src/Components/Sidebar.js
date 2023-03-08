import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sidebar.css';
function Sidebar(){
    const navigate = useNavigate(); 
    return(
    <>
    <div  className="div-one">
   
    <button onClick={()=>{navigate('students')}}>Student List</button><br />
    <button onClick={()=>{navigate('courses')}}>Course List</button><br />
    <button>Extra Button</button><br />
    <button>Extra Button</button><br />
    </div>
    </>
    )

}
export default Sidebar;