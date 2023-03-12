import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
// import '../CSS/Course.css'
import { Button, Table, Layout, Card, Space,Input,Select } from 'antd'
const { Option } = Select;
const { Content } = Layout;

function Course() {
  const { id } = useParams();
  const BASE_URL = '/admin/addContent/' + id;
  const BASE_URL_CONTENT = "/admin/course/" + id;

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate()
  const [enrolledStudents, setEnrolledStudents] = useState([
    { firstName: 'Sample', lastName: 'Data' },
    { firstName: 'Jane', lastName: 'Doe' },
    { firstName: 'Bob', lastName: 'Smith' },
  ]);

  const [content, setContent] = useState(null);

  const [course, setCourse] = useState(null);


  const getData = async () => {
    try {
      const response = await axios.get(BASE_URL_CONTENT
      );
      console.log("In Get Data of Course" + JSON.stringify(response));
      setCourse(response.data)
      setContent(response.data.contents)
    } catch (e) {
      console.log("In Get Data of Course :" + e)
      // console.log("URL ===="+`/admin/${auth.id}/courses`)
      // alert("Something went wrong in Get Data Course")
    }
  }

  useEffect(() => {
    if (course === null) getData();
  })



  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const refreshContent = async () => {
    if (auth === null || auth === undefined) {
      toast("You should login FIrst");
      navigate('../');
    }
    try {
      const response = await axios.get(`/admin/${auth.id}/courses`
      );
      console.log("In Refresh" + JSON.stringify(response));
      setCourse(response.data)
    } catch (e) {
      console.log(e)
      console.log("URL ====" + `/admin/${auth.id}/courses`)
      alert("Something went wrong")
    }
  }

  const handleAddContent = async () => {
    if (newTitle.length === 0 || newContent.length === 0) return;
    try {
      const response = await axios.post(BASE_URL,
        { 'contentName': newTitle, 'link': newContent }

      );
      setNewTitle('')
      setNewContent('')
      toast('content Succefuly added !', { autoClose: 200 });
      getData();

    } catch (e) {
      console.log(e)
      alert("Something went wrong")
    }

  }


  // Ant Design Table data
  const columns = [
    {
      title: 'Topic',
      dataIndex: 'contentName',
  
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => (a.firstName).toLowerCase() < (b.firstName).toLowerCase(),
      sortDirections: ['descend'],
    },
    {
      title: 'Resources',
      dataIndex: 'link',
  
      sorter: (a, b) => a.lastName < b.lastName,
      sortDirections: ['descend'],
      render: (_, record) => <a href={"https://"+record.link} target={'_blank'}> {record.link}</a>
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
  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com">
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>)
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
      <Space block={true} align='center' style={{
        padding:10
      }} >
      <Input style={{
        width:400
      }}
       value={newTitle} onChange={(e) => { setNewTitle(e.target.value) }} placeholder="Enter Content Title" />
  
           <Input style={{
            width:500
           }}
            addonBefore={selectBefore} value={newContent} addonAfter={selectAfter} placeholder="Enter Content Link" onChange={(e) => { setNewContent(e.target.value) }} />
    <Button onClick={handleAddContent}>Add Content</Button>
    <Button onClick={refreshContent}>Refresh Content</Button>
      </Space>
      {/* <input type="text" value={newContent} onChange={(e) => { setNewContent(e.target.value) }} placeholder="Enter Content Link" /> */}
    <Table
    style={{
      width:1200,
      alignItems:'center'
    }}
    caption="Content List"
    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
      columns={columns} dataSource={content} onChange={onChange} />
    

  </Space>
}

export default Course;
