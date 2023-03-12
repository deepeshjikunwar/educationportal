import { Popconfirm } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import '../CSS/Sidebar.css';
function SidebarUser(){
    const navigate = useNavigate(); 
    const {auth} = useContext(AuthContext);
    const DELETE_USER_URL = `users/${auth?.id}`
    const handleDeleteUser =async () => {
            try {
              const response = await axios.delete(DELETE_USER_URL
              );
              toast('User Deleted !', { autoClose: 200 });
              navigate('/')
            } catch (e) {
              navigate('/')
              console.log(e)
              // alert("Something went wrong")
            }
    }

    const confirm = (e) => {
      console.log(e);
    };
    const cancel = (e) => {
      console.log(e);

    };
   



    return(
    
    <div  className="sidebar">
   
    <button className='sidebar-btns' onClick={()=>{navigate('enrolled_courses')}}>Enrolled Course</button><br />
    <button className='sidebar-btns' onClick={()=>{navigate('available_courses')}}>Available Course</button><br />
    <button className='sidebar-btns' onClick={()=>{navigate('code_editor')}}> Progress Report </button>
    <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={handleDeleteUser}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <button className='sidebar-btns'>
        Delete Account
        </button>
      </Popconfirm>
    </div>
    
    )

}
export default SidebarUser;