import { Form,Input, Checkbox, Button, DatePicker, Select } from 'antd';
import React, { useContext, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
function AddAssignmentForm() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate()
  const ASSIGNMENT_URL = `/admin/course/${auth.id}/addAssignment`
  const [form] = Form.useForm();
  const [date, setDate] = useState();
  const onFinish = async(values) => {
    console.log('Success:', values);
    console.log("Date",date);
    try {
      const response = await axios.post(ASSIGNMENT_URL,
        {         description:values.description,
        dueDate:date,
        title:values.title}
      );
          console.log(JSON.stringify(response.data));
          navigate('../')
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        toast.error("Server Not Responding Logged In", { position: "top-right", autoClose: 2000 })
        // navigate('../')
      }
      else if(err.code === "ERR_BAD_REQUEST"){
        console.log(err);
        toast.error("Invalid Credintial", { position: "top-right", autoClose: 2000, })
      }
      else{
        
        toast.error("Something Went Wrong in LogIn", { position: "top-right", autoClose: 2000, })
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onChange = (date, dateString)=>{
    setDate(dateString)
  }
  console.log("Addddd Asignmentttttttttt");
  return (
    <Form title='Assignment'
    name="basic"
    labelCol={{span: 8}}
    wrapperCol={{ span: 16}}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Question"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input your Question!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Due Date"
      name="due_date"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <DatePicker onChange={onChange} format='YYYY-MM-DD' style={{width:'100%'}}/>
    </Form.Item>

    <Form.Item
      label="Language"
      name="title"
      wrapperCol={{
        offset: 0,
        span: 16,
      }}
    >
      <Select
      // style={{
      //   width: 120,
      // }}
      options={[
        {
          value: 'python',
          label: 'Python',
        },
        {
          value: 'java',
          label: 'Java',
        },
        {
          value: 'cpp',
          label: 'C++',
        },
        {
          value: 'javascript',
          label: 'JavaScript',
        },
        {
          value: 'text',
          label: 'Text Only',
        },
      ]}
    />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default AddAssignmentForm