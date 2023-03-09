import React ,{useContext, useEffect, useState} from 'react'
import CourseBox from './CourseBox'
import '../CSS/AdminCourseList.css'
import axios from '../Api/axios';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { toast } from 'react-toastify';

function EnrolledCourse() {
  const USERS_URL = "users/allCourses";
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate()

  const [courses, setCourses] = useState(null);

  const getData = async () => {

    try {
      const response = await axios.get(USERS_URL
      );
      console.log("In Get API of Enrolled Student : "+response.data)
      setCourses(response.data)
    } catch (e) {
      console.log("In Error of Enrolled Courses : "+e);
    }
  }

  useEffect(() => {
    if(courses === null || courses === undefined) getData();
  });

  useEffect(() => {
      if(auth === null || auth === undefined) {
          toast.info("Not Authorized Login First",{autoClose:200});
          navigate('../');
        }
  }, [])

  return (
    <div className='enrolled-courses admin-course-list'>
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

export default EnrolledCourse