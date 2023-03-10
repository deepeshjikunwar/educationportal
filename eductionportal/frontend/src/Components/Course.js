import React,{useContext, useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import '../CSS/Course.css'

function Course() {
    const {id} = useParams();
    const BASE_URL = '/admin/addContent/'+id;
    const BASE_URL_CONTENT = "/admin/course/"+id;

    const {auth} = useContext(AuthContext);
    const navigate = useNavigate()
const [enrolledStudents, setEnrolledStudents] = useState([
  { firstName: 'Sample', lastName: 'Data' },
  { firstName: 'Jane', lastName: 'Doe' },
  { firstName: 'Bob', lastName: 'Smith' },
]);

const [content, setContent] = useState(null);

const [course , setCourse] = useState(null);


const getData = async() => {
  try {
    const response = await axios.get(BASE_URL_CONTENT
      );
      console.log("In Get Data of Course"+JSON.stringify(response));
      setCourse(response.data)
      setContent(response.data.contents)
}catch(e){
console.log("In Get Data of Course :"+e)
// console.log("URL ===="+`/admin/${auth.id}/courses`)
// alert("Something went wrong in Get Data Course")
}
}

useEffect(() => {
  if(course === null) getData();
})



const [newTitle, setNewTitle] = useState('');
const [newContent, setNewContent] = useState('');

const refreshContent = async() =>{
    if(auth === null || auth === undefined) {
        toast("You should login FIrst");
        navigate('../');
    }
    try {
        const response = await axios.get(`/admin/${auth.id}/courses`
          );
          console.log("In Refresh"+JSON.stringify(response));
          setCourse(response.data)
  }catch(e){
    console.log(e)
    console.log("URL ===="+`/admin/${auth.id}/courses`)
    alert("Something went wrong")
  }
}

const handleAddContent = async () => {
      if(newTitle.length === 0 || newContent.length === 0) return;
        try {
            const response = await axios.post(BASE_URL,
              { 'contentName':newTitle,'link':newContent}

              );
              setNewTitle('')
              setNewContent('')
              toast('content Succefuly added !',{autoClose:200});
              getData();

      }catch(e){
        console.log(e)
        alert("Something went wrong")
      }
    
}
//   // TODO: Implement logic to add new content to the course
  return (
    <div className="course">
    <div className="course-info">
      <h1>Title : {course?.title}</h1>
      <p>Start Date: {course?.startDate}</p>
      <p>End Date: {course?.endtDate}</p>
      <p>Capacity: {course?.capacity}</p>
    </div>

    <div className="course-students">
      <h2>Enrolled Students:</h2>
      <ul>
        {enrolledStudents.map((student, index) => (
          <li key={index}>{student.firstName} {student.lastName}</li>
        ))}
      </ul>
    </div>

    <div className="course-content">
      <h2>Course Content:</h2>
      <ul>
        {content ? content.map((item, index) => (
          <li key={index}><a href={"https://"+(item.link)} target="_blank">{item.contentName}</a></li>
        )) : null}
        
          <input type="text" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} placeholder="Enter Content Title"/>
          {/* </li>
          <li> */}
          <input type="text" value={newContent} onChange={(e)=>{setNewContent(e.target.value)}}placeholder="Enter Content Link"/>
        
      </ul>
      <button onClick={handleAddContent}>Add Content</button>
      <button onClick={refreshContent}>Refresh Content</button>
    </div>
  </div>
  )
}

export default Course;
