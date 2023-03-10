import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
// import '../CSS/Course.css'
import { Button, Table, Layout, Card, Space,Input,Select } from 'antd'
const { Option } = Select;
const { Content } = Layout;

function CourseStudent() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const BASE_URL_CONTENT = `/admin/${auth.id}/courses/${id}/users`;

  const navigate = useNavigate()
  const [enrolledStudents, setEnrolledStudents] = useState();

  const [content, setContent] = useState(null);

  const [course, setCourse] = useState(null);


  const getData = async () => {
    try {
      const response = await axios.get(BASE_URL_CONTENT
      );
      console.log("In Get Data of Course Student List" + JSON.stringify(response));
      setEnrolledStudents(response.data)
   
    } catch (e) {
      console.log("In Get Data of Course :" + e)
      // console.log("URL ===="+`/admin/${auth.id}/courses`)
      // alert("Something went wrong in Get Data Course")
    }
  }

  useEffect(() => {
    if (course === null) getData();
  })

  // Ant Design Table data
  const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
  
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => (a.firstName).toLowerCase() < (b.firstName).toLowerCase(),
        sortDirections: ['descend'],
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
  
        sorter: (a, b) => a.lastName < b.lastName,
        sortDirections: ['descend'],
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
    
      render: (_, record) => <Button onClick={() => { console.log(record.id) }} type="primary" danger ghost>Delete</Button>,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  // Input Data

  //   // TODO: Implement logic to add new content to the course
  return <Space
  block={true}
  direction={'vertical'}
  size={['middle']}
  wrap
  align='center'
  >
    <Card
      title={course?.title}
      bordered={false}
      style={{
        width: 1200,
      }}
    >
      <p>Start Date: {course?.startDate}</p>
      <p>End Date: {course?.endtDate}</p>
      <p>Capacity: {course?.capacity}</p>
    </Card>
      {/* <input type="text" value={newContent} onChange={(e) => { setNewContent(e.target.value) }} placeholder="Enter Content Link" /> */}
    <Table
    style={{
      width:1200,
      alignItems:'center'
    }}
    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
      columns={columns} dataSource={enrolledStudents} onChange={onChange} />
    

  </Space>
}

export default CourseStudent;
