import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../Api/axios';
// import '../CSS/AdminStudentList.css'
import { Table , Button} from 'antd';
function AdminStudentList() {
    const [students, setStudents] = useState(null)
    const USERS_URL = "users";
    const navigate = useNavigate()
    const handleEditStudent =(id)=>{
      navigate('../editStudent/'+id)
    }
    const handleDeleteStudent =()=>{}

    

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
      if(students === null) getData();
    });



    const columns = [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        // filters: [
        //   {
        //     text: 'Joe',
        //     value: 'Joe',
        //   },
        //   {
        //     text: 'Jim',
        //     value: 'Jim',
        //   },
        //   {
        //     text: 'Submenu',
        //     value: 'Submenu',
        //   },
        // ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => (a.firstName).toLowerCase() < (b.firstName).toLowerCase(),
        sortDirections: ['descend'],
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        // filters: [
        //   {
        //     text: 'Joe',
        //     value: 'Joe',
        //   },
        //   {
        //     text: 'Jim',
        //     value: 'Jim',
        //   },
        //   {
        //     text: 'Submenu',
        //     value: 'Submenu',
        //   },
        // ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        // onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.lastName < b.lastName,
        sortDirections: ['descend'],
      },
      {
        title: 'Email',
        dataIndex: 'email',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_,record) => <Button onClick={()=>{console.log(record.id)}} type="primary" danger ghost>Delete</Button>,
      },
    ];

    // const data = [
    //   {
    //     key: '1',
    //     name: 'John',
    //     lname: "ABhi",
    //     email: 32,
    //     address: 'New York No. 1 Lake Park',
   
    //   },
    //   {
    //     key: '2',
    //     name: 'Jim',
    //     email: 42,
    //     address: 'London No. 1 Lake Park',
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     email: 32,
    //     address: 'Sydney No. 1 Lake Park',
    //   },
    //   {
    //     key: '4',
    //     name: 'Jim Red',
    //     email: 32,
    //     address: 'London No. 2 Lake Park',
    //   },
    // ];

    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };


    return <Table style={{width:1200}} pagination= { { pageSizeOptions: ['5', '10'], showSizeChanger: true}}
      columns={columns} dataSource={students} onChange={onChange} />
 

  // return (
  //   <table className='dashboard-student'> 
  //   <thead>
  //     <tr>
  //       <th>First Name</th>
  //       <th>Last Name</th>
  //       <th>Email</th>
  //       <th colSpan={2}>Actions</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {students ? students.map((student) => (
  //       <tr className='dashboard-student-row' key={student.id}>
        
  //         <td>{student.firstName}</td>
  //         <td>{student.lastName}</td>
  //         <td>{student.email}</td>
  //         <td>
  //           <button onClick={() => handleEditStudent(student.id)}>Edit</button>
  //           <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
  //         </td>
  //       </tr>
  //     )) : null}
  //   </tbody>
  // </table>
  // )
}

export default AdminStudentList