import React from 'react'
import CourseBox from './CourseBox'
import '../CSS/AdminCourseList.css'
import { useNavigate } from 'react-router-dom'
function AdminCourseList({ courses }) {
    // let courses = [32,333];
    const navigate = useNavigate()
    // console.log("In Admin Course List : " + JSON.stringify(courses))
    return (
        <div className='admin-course-list'>
            {/* Course List */}
            {/* <CourseBox onClick={()=>{alert('hellll')}} title="Java" description="Good" capacity="30" /> */}
            {/* <div onClick={() =>  */}
                {/* // ('dsff')}> */}
                {/* <CourseBox title="Java" description="Good" capacity="30" /> */}
            {/* </div> */}
            {/* {courses? courses.map((ele)=>{ return <div onClick={()=>{console.log(ele.id);}}> <CourseBox className="course_box"} title={ele.title} description={ele.description} capacity={ele.capacity} /> </div>}) : null} */}
            {/* <CourseBox title={"ele.title"} description={"ele.description"} capacity={30} />
            <CourseBox title={"ele.title"} description={"ele.description"} capacity={30} />
            <CourseBox title={"ele.title"} description={"ele.description"} capacity={30} /> */}
            {courses? courses.map( (ele)=>{
                return <div onClick={()=>{navigate('../course/'+ele.id)}} className="course_box_len"> 
                <CourseBox title={ele.title} description={ele.description} capacity={ele.capacity} /> 
                 </div>
            }):null}
        </div>
    )
}

export default AdminCourseList