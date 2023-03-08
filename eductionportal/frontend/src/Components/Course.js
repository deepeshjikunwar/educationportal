import React,{useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
function Course() {
    const {id} = useParams();
    const BASE_URL = '/admin/addContent/';
    const BASE_URL_CONTENT = "/admin/";

    const {auth} = useContext(AuthContext);
    const navigate = useNavigate()
const [enrolledStudents, setEnrolledStudents] = useState([
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Doe' },
  { firstName: 'Bob', lastName: 'Smith' },
]);

const [content, setContent] = useState([
  { contentName: 'Introduction', link: 'https://example.com/intro' },
  { contentName: 'Lesson 1', link: 'https://example.com/lesson1' },
  { contentName: 'Lesson 2', link: 'https://example.com/lesson2' },
]);

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

      }catch(e){
        console.log(e)
        alert("Something went wrong")
      }
    
}
//   // TODO: Implement logic to add new content to the course
  return (
    <div className="course">
    <div className="course-info">
      <h1>Title</h1>
      <p>Start Date: 01/01/2023</p>
      <p>End Date: 01/31/2023</p>
      <p>Capacity: 50</p>
    </div>

    <div className="enrolled-students">
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
        {content.map((item, index) => (
          <li key={index}><a href={item.link}>{item.contentName}</a></li>
        ))}
        <li>
          <input type="text" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} placeholder="Enter Content Title"/>
          {/* </li>
          <li> */}
          <input type="text" value={newContent} onChange={(e)=>{setNewContent(e.target.value)}}placeholder="Enter Content Link"/>
        </li>
      </ul>
      <button onClick={handleAddContent}>Add Content</button>
      <button onClick={refreshContent}>Refresh Content</button>
    </div>
  </div>
  )
}

export default Course;



// return (
//   <div className="course">
//     <div className="course-info">
//       <h1>Title</h1>
//       <p>Start Date: 01/01/2023</p>
//       <p>End Date: 01/31/2023</p>
//       <p>Capacity: 50</p>
//     </div>

//     <div className="enrolled-students">
//       <h2>Enrolled Students:</h2>
//       <ul>
//         {enrolledStudents.map((student, index) => (
//           <li key={index}>{student.firstName} {student.lastName}</li>
//         ))}
//       </ul>
//     </div>

//     <div className="course-content">
//       <h2>Course Content:</h2>
//       <ul>
//         {content.map((item, index) => (
//           <li key={index}><a href={item.link}>{item.contentName}</a></li>
//         ))}
//         <li>
//           <input type="text" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} placeholder="Enter Content Title"/>
//           {/* </li>
//           <li> */}
//           <input type="text" value={newContent} onChange={(e)=>{setNewContent(e.target.value)}}placeholder="Enter Content Link"/>
//         </li>
//       </ul>
//       <button onClick={handleAddContent}>Add Content</button>
//     </div>
//   </div>
// );