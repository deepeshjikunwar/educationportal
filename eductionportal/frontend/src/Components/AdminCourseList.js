import React,{useContext, useEffect} from 'react'
import CourseBox from './CourseBox'
// import '../CSS/AdminCourseList.css'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { toast } from 'react-toastify';
import {  Space } from 'antd';
function AdminCourseList({ courses, forStudent }) {
    // let courses = [32,333];
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log("FOR COURSE STUDENT LIST : "+forStudent);
        if(auth === null || auth === undefined) {
            toast.info("Not Authorized Login First",{autoClose:200});
            navigate('../');
        }
    }, [])
    

    // console.log("In Admin Course List : " + JSON.stringify(courses))
    return (
        <Space direction="horizontal" size={10} className='admin-course-list'>
            {courses? courses.map( (ele)=>{
                return <div onClick={()=>{
                    forStudent ? navigate('../courseStudentList/'+ele.id) :navigate('../course/'+ele.id)
                }} className="course_box_len"> 
                <CourseBox title={ele.title} description={ele.description} capacity={ele.capacity} forStudent={forStudent}/> 
                 </div>
            }):null}
        </Space>
    )
}

export default AdminCourseList