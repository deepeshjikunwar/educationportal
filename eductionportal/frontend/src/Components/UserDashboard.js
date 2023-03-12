import React, { useState, useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import SidebarUser from './SidebarUser';
import AuthContext from '../context/AuthProvider';
import { Card, Input, Space } from 'antd';
// import '../CSS/AdminDashboard.css'
import { Layout , Drawer,FloatButton, Button, Modal } from 'antd';
import axios from '../Api/axios';
const {Sider,Content} = Layout;
// import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'
// import Course from './Course';

function UserDashboard() {
  const {TextArea} = Input;  
    const navigate = useNavigate();
    const QUERY_URL = `users/addQuery`
    const GET_QUERY_URL = `admin/getAllQuery`
    // const {drawerStatus, setDrawerStatus} = useContext(AuthContext);
    // console.log(auth);
  // state to hold the list of students


  // function to delete a student
  const handleDeleteStudent = (id) => {

  };

  // function to edit a student
  const handleEditStudent = (id) => {
    // implementation for editing a student
  };

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [queryFormStatus, setQueryFormStatus] = useState(false);


  const onOpen=()=>{
    setDrawerStatus(true)
    getAllQueries()
  }

  const onClose = () => {
    setDrawerStatus(false);
  };

  const [question, setQuestion] = useState('');
  const handleSubmitQuery = async ()=>{
    try {
      const response = await axios.post(QUERY_URL, {
        question
      }
    );
    console.log("response UserDashboard.js in Query Handle:"+JSON.stringify(response));
    setQuestion('');
    setQueryFormStatus(false);
    // console.log(auth);
    } catch(err){
 
      if(err.code === "ERR_NETWORK"){
        // toast("Server Not Responding Logged In",{position:"top-right",autoClose:2000})
      }
    }
  }

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


  return (
    <Layout hasSider className='dashboard'>
          <SidebarUser Sider={Sider}/>

        <div className='dashboard-content'>
        <Content  style={
      {
      textAlign: 'center',
      minHeight: 120,
      lineHeight: '20px',
      width:1200,
      marginLeft:120,
      color: '#fff',
      
      backgroundColor: '#fff',}} className="course">
          <Outlet />
      </Content>
          {/* <div className="dashboard-content-btns"> */}
      {/* <button onClick={() => { navigate("/editStudent") }} >Add Student</button> */}
      {/* <button onClick={() => { navigate("/courses") }}>Add Course</button> */}
          {/* </div> */}
        </div>
     
        <Drawer title="Queries Section Student" placement="right" onClose={onClose} open={drawerStatus}>
        <Button onClick={()=>{setQueryFormStatus(true)}}>Raise Query</Button>
        {queries?.map((ele)=>{return <Card key={ele.id}>
          {ele.question}
          {ele.answer}
          </Card>})}
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <FloatButton onClick={onOpen}>Ask Queries</FloatButton>
      <Modal
        open={queryFormStatus}
        title="Raise Query"
        // onOk={handleOk}
        // onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitQuery}>
            Submit
          </Button>,
        ]}
        >
        <Space>Ask Your Dought</Space>   
        <br/>    
        <TextArea value={question} onChange={(e)=>{setQuestion(e.target.value)}} placeholder={'Ask Question'} />
 
      </Modal>
    </Layout>
  );
}

export default UserDashboard;
