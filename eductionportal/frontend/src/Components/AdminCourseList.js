import React from 'react'
import CourseBox from './CourseBox'
import '../CSS/AdminCourseList.css'
function AdminCourseList({ courses }) {
    // let courses = [32,333];
    console.log("In Admin Course List : " + JSON.stringify(courses))
    return (
        <div>
            {/* <CourseBox onClick={()=>{alert('hellll')}} title="Java" description="Good" capacity="30" /> */}
            {/* <div onClick={() =>  */}
                {/* // ('dsff')}> */}
                {/* <CourseBox title="Java" description="Good" capacity="30" /> */}
            {/* </div> */}
            {/* {courses? courses.map((ele)=>{ return <div onClick={()=>{console.log(ele.id);}}> <CourseBox className="course_box"} title={ele.title} description={ele.description} capacity={ele.capacity} /> </div>}) : null} */}
            {courses? courses.map( (ele)=>{
                return <div onClick={()=>{console.log(ele.id);}} className="course_box_len"> 
                <CourseBox title={ele.title} description={ele.description} capacity={ele.capacity} /> 
                 </div>
            }):null}
        </div>
    )
}

export default AdminCourseList