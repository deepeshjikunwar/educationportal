import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import axios from '../Api/axios';
// import '../CSS/AdminDashboard.css'
import CourseForm from './CourseForm';
import CourseBox from './CourseBox';
import Sidebar from './Sidebar'
import { Drawer, Layout, FloatButton, Input, Modal, Button, Space, Card } from 'antd'
import AuthContext from '../context/AuthProvider';

const { Sider, Content } = Layout;

function AdminDashboard() {
  const { auth } = useContext(AuthContext);
  const {TextArea} = Input;  
  const navigate = useNavigate();
  const QUERY_URL = `users/addQuery`
  const GET_QUERY_URL = `admin/getAllQuery`
  const RESOLVE_QUERY_URL = `admin/${auth?.id}/resolveQuery/`;

  const USERS_URL = "users";
  // const { drawerStatus, setDrawerStatus } = useContext(AuthContext);

  // state to hold the list of students
  const [students, setStudents] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 20 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 21 },
    { id: 3, firstName: 'Bob', lastName: 'Smith', email: 22 },
  ]);

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [queryFormStatus, setQueryFormStatus] = useState(false);

  const onClose = () => {
    setDrawerStatus(false);
  };
  const onOpen = () => {
    setDrawerStatus(true);
    getAllQueries()
  }

  const getData = async () => {

    try {
      const response = await axios.get(USERS_URL
      );
      console.log(response.data)
      setStudents(response.data)
    } catch (e) {
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const [answer, setAnswer] = useState('');
  // function to delete a student
  const handleDeleteStudent = (id) => {
    const newStudents = students.filter((student) => student.id !== id);
    setStudents(newStudents);
  };

  // function to edit a student
  const handleEditStudent = (id) => {
    // implementation for editing a student
    navigate(`/edit_student/${id}`)
  };

  const handleCancel = () =>{
    setQueryFormStatus(false);
  }

  const [queries, setQueries] = useState();
  const getAllQueries = async() =>{
    try{
      const response = await axios.get(GET_QUERY_URL);
      console.log("In Get all Queries of UserDashboard.js"+ JSON.stringify(response.data));
      setQueries(response.data)
    }
    catch(err){
      console.log("In Get Error all Queries of UserDashboard.js"+err);
    }
  }
  
  const [currentQuery, setCurrentQuery] = useState(null)

  const resolveQuery = async() =>{
    try{
      const response = await axios.put(RESOLVE_QUERY_URL + currentQuery?.id,{answer});
      console.log("In Get all Queries of UserDashboard.js"+ JSON.stringify(response.data));
      setCurrentQuery(null)
      getAllQueries();
      setAnswer('');
      setQueryFormStatus(false);
    }
    catch(err){
      console.log("In Resolve Query Error"+err);
    }
  }

  return (
    <Layout hasSider className='dashboard'>
    
  


          <Sidebar Sider={Sider} />
          <Content  style={
      {
      textAlign: 'center',
      minHeight: 120,
      lineHeight: '20px',
      width:1200,
      marginLeft:180,
      color: '#fff',
      
      backgroundColor: '#fff',}} className="course">

          <Outlet Content={Content} />
      </Content>
          {/* <div className="dashboard-content-btns"> */}
          {/* <button onClick={() => { navigate("/editStudent") }} >Add Student</button> */}
          {/* <button onClick={() => { navigate("/courses") }}>Add Course</button> */}
          {/* </div> */}
      
          <Drawer title="Queries Section Student" placement="right" onClose={onClose} open={drawerStatus}>
        {/* <Button onClick={()=>{setQueryFormStatus(true)}}>Raise Query</Button> */}
        {queries?.map((ele)=>{return <Card key={ele.id}>
          <p>
            Q : {ele.question}
            </p>
            <pre>
          Ans : {ele.answer}
            </pre>
          <Button onClick={()=>{setQueryFormStatus(true);setCurrentQuery(ele);}} disabled={ele?.resolved}>Resolve</Button>
          </Card>})}
      </Drawer>
      <FloatButton onClick={onOpen}>Ask Queries</FloatButton>
      <Modal
        open={queryFormStatus}
        title="Resolve Query"
        // onOk={handleOk}
        // onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={resolveQuery}>
            Submit
          </Button>,
        ]}
        >
        <Space>Question : {currentQuery?.question}</Space>   
        <br/>    
        <TextArea value={answer} onChange={(e)=>{setAnswer(e.target.value)}} placeholder={'Ask Question'} />
 
      </Modal>
    </Layout>





  );
};

export default AdminDashboard;