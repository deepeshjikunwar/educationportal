import { Button, Card, Checkbox, Space, Table } from 'antd';
import React,{useContext, useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
// import '../CSS/Course.css'
function CourseUser({isEnroll}) {
    const {id} = useParams();
    const {auth} = useContext(AuthContext);
    const BASE_URL = '/users/addContent/'+id;
    const BASE_URL_CONTENT = "/admin/course/"+id;
    const ENROLL_COURSE_URL = `users/${auth.id}/enroll/`+id;
    const ASSIGNMENT_URL = `users/courses/${id}/getAssignment`

    const navigate = useNavigate()


const [content, setContent] = useState(null);

const [course , setCourse] = useState(null);
const [enrollStatus, setEnrollStatus] = useState(false);
const [assignment, setAssignment] = useState(null);

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
const MARK_URL = 'users/'
useEffect(() => {
  if(course === null) {
    getData() 
    getAssignment()
  };
})
const onChangeCheck =async (id,checkedValue) => {
  try {
    const response = await axios.post(MARK_URL+`${auth.id}/${id}`,
      { isVisited: checkedValue}
    );
    console.log("response of marking Student :" + JSON.stringify(response));
    
  } catch (err) {
    if (err.code === "ERR_NETWORK") {
      toast.error("Server Not Responding Logged In", { position: "top-right", autoClose: 2000 })
      navigate('../')
    }
    else{
      
      toast.error("Something Went Wrong in Marking Student", { position: "top-right", autoClose: 2000, })
    }
  }
};
// Enrolling COurse

 const enrollInCourse = async() =>{
  try {
    const response = await axios.get(ENROLL_COURSE_URL
      );
      console.log("In Get Data of Course"+JSON.stringify(response));
      setEnrollStatus(true)
}catch(e){
console.log("In Get Data of Course :"+e)
// console.log("URL ===="+`/admin/${auth.id}/courses`)
// alert("Something went wrong in Get Data Course")
}
 }
// Ant Design Table data
const getAssignment = async() => {
  try {
    const response = await axios.get(ASSIGNMENT_URL
      );
      console.log("In Get Assignment of Course"+JSON.stringify(response));
      setAssignment(response.data)
}catch(e){
console.log("In Get Data of Course :"+e)
// console.log("URL ===="+`/admin/${auth.id}/courses`)
// alert("Something went wrong in Get Data Course")
}
}
const columns2 = [
  {
    title: 'Question',
    dataIndex: 'description',

    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => (a.firstName).toLowerCase() < (b.firstName).toLowerCase(),
    sortDirections: ['descend'],
  },
  {
    title: 'Language',
    dataIndex: 'title',

    sorter: (a, b) => a.lastName < b.lastName,
    sortDirections: ['descend'],
  },
  {
    title: 'Solve',
    dataIndex: '',
    key: 'x',
  
    render: (_,record) => <Button onClick={()=>{navigate(`../code_editor/`+record.id)}} ></Button>,
  },                      //c<Checkbox onChange={onChange}>Checkbox</Checkbox>;
];
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
    title: 'Completed',
    dataIndex: '',
    key: 'x',
  
    render: (_,record) => <Checkbox onChange={(e)=> {onChangeCheck(record.id,e.target.checked)}} ></Checkbox>,
  },                      //c<Checkbox onChange={onChange}>Checkbox</Checkbox>;
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
}


//   // TODO: Implement logic to add new content to the course
  return (
    <Space
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

    <Table
    style={{
      width:1200,
      alignItems:'center'
    }}
    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
      columns={columns} dataSource={content} onChange={onChange} />
    <Table
    style={{
      width:1200,
      alignItems:'center'
    }}
    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
      columns={columns2} dataSource={assignment} onChange={onChange} />
    
    {isEnroll ? 
    <Button onClick={enrollInCourse}>{enrollStatus ? 'Enrolled': 'Enroll'}</Button> 
    : null}

  </Space>
  )
}

export default CourseUser;
