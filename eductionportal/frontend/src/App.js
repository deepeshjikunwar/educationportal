import React, {useContext} from 'react';
import './App.css';
import Login from './Components/Login';
import Header from './Components/Header';
import SignupForm from './Components/SignupForm';
import { Route, Routes } from "react-router-dom";
import AdminDashboard from './Components/AdminDashboard';
import AuthContext from './context/AuthProvider';
import Home from './Components/Home';
import LoginUser from './Components/LoginUser';
import SignupFormUser from './Components/SignupFormUser';
import UserDashboard from './Components/UserDashboard';
import EditStudent from './Components/EditStudent';
import Footer from './Components/Footer';
import {ToastContainer, toast } from 'react-toastify';
import CourseForm from './Components/CourseForm';


// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AdminStudentList from './Components/AdminStudentList';
import AdminCourseList from './Components/AdminCourseList';
import Course from './Components/Course';
import EnrolledCourse from './Components/EnrolledCourse';
import AvailableCourses from './Components/AvailableCourses';
import CourseUser from './Components/CourseUser';
import CourseStudent from './Components/CourseStudent';
import CodeEditor from './Components/CodeEditor';

function App() {
  // toast.configure();

  const{auth, setTastFun, toastFun} = useContext(AuthContext);
  // setToastFun()
  // toast('hello')
  console.log("In admin : "+auth);
  return (
    <div className="App">
      <Header />
      <main>
        
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login_user' element={<Login />} />
        <Route path='/login_admin' element={<Login />} />

        <Route path='/signup_user' element={<SignupForm/>} />
           {/* <Login /> */}
        <Route path='/signup_admin' element={<SignupForm />} />
        {/* <Route path='/course' element={<Course />} /> */}
        <Route path='/user_dashboard/' element={<UserDashboard />} >
            <Route path='enrolled_courses' element={<EnrolledCourse />} />
            <Route path='available_courses' element={<EnrolledCourse newEnroll={true} />} />
            <Route path='course/:id' element={<CourseUser />} />
            <Route path='course/enroll/:id' element={<CourseUser isEnroll={true}/>} />
            <Route path='code_editor' element={<CodeEditor/>} />
        </Route>
        <Route path='/admin_dashboard/' element={<AdminDashboard />} >
            <Route path='students' element={<AdminStudentList />} />
            <Route path='course/:id' element={<Course />} />
            <Route path='courseStudentList/:id' element={<CourseStudent />} />
            <Route path='courses' element={<AdminCourseList courses={auth? auth.courses:""}/>}/>
            <Route path='courseStudent' element={<AdminCourseList courses={auth? auth.courses:""} forStudent={true}/>}/>
            <Route path='editStudent/:id' element={<EditStudent />}/>
            <Route path='addCourse' element={<CourseForm />}/>

        </Route>
        <Route path ='/edit_student/:id' element={<EditStudent />} />
        {/* <Route path='/editStudent' element={<AdminDashboard />} /> */}
        <Route path='/addCourse' element={<CourseForm />}  /> 

      </Routes>
      </main>
      {/* <Footer /> */}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
