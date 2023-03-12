import { Button, Card, Col, Input, Layout, Row, Space, Tabs } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import axiosCode from '../Api/axiosCode'
import axios from '../Api/axios'
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { StreamLanguage } from '@codemirror/language';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { sql } from '@codemirror/lang-sql';
// import { pythonLanguage } from '@codemirror/lang-python/dist';
const { Sider, Content } = Layout;

function CodeEditor() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const ASSIGNMENT_URL = `/users/assignment/${id}`

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [codeLang, setCodeLang] = useState('');
  const [assignment, setAssignment] = useState(null);

  const getAssignment = async () => {
    console.log("In Get Assignment : " + id);
    try {
      const response = await axios.get(ASSIGNMENT_URL
      );
      console.log("In Get API of Code Editor : " + JSON.stringify(response.data))
      setAssignment(response.data)
    } catch (e) {
      console.log("In Error of Code Editor : " + e);
    }

  }

  useEffect(() => {
    if (assignment === null) getAssignment();
  })


  var langDict = {
    "python": python(),
    "cpp": cpp(),
    "javascript": javascript({jsx:true}),
    "java": java()
  }

  var apiLangFormate = {
    "java": "java",
    "python": "py",
    "cpp": "cpp",
    "javascript": "js"
  }

  const show = async () => {
    try {

      const resp = await axiosCode.post('', {
        "code": code,
        "language": apiLangFormate[assignment.title],
        "input": input
      })
      console.log("Response : " + JSON.stringify(resp.data));
      setOutput(resp.data.output)
      setError(resp.data.error)
      console.log("Length : " + output.length);
      output.length > 0 ? setCurrentKey('2') : setCurrentKey('3');
      // setCurrentKey('2')
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        // setCode('')
        // setError('')
        // setOutput('')
        // setInput('')
      }
      console.log(error);

    }
  }
  //Tabs
  const [currentKey, setCurrentKey] = useState('1')
  const onChange = (key) => {
    setCurrentKey(key)
  };
  const items = [
    {
      key: '1',
      label: `Input`,
      children: <Card style={{ color: 'red', backgroundColor: 'black', height: '100%', width: '94%' }}>
        <p style={{ color: 'lightgreen' }}>Input : </p>
        <span>
          <Input value={input} onChange={(e) => { setInput(e.target.value) }} />
        </span>
      </Card>,
    },
    {
      key: '2',
      label: `Output`,
      children:
        <Card style={{ color: 'whitesmoke', backgroundColor: 'black', height: '100%', width: '94%' }}>
          <p style={{ color: 'lightgreen' }}>Output : </p>
          <span style={{ maxWidth: '95%', wordBreak: 'break-all', whiteSpace: 'pre-line' }}>
            {output}</span>
        </Card>,
    },
    {
      key: '3',
      label: `Error`,
      children: <Card style={{ color: 'red', backgroundColor: 'black', height: '100%', width: '94%' }}>
        <p style={{ color: 'yellow' }}>Error : </p>
        <span style={{ maxWidth: '95%', wordBreak: 'break-all', whiteSpace: 'pre-line' }}>{error}</span>
      </Card>,
    },
  ];
  return (
    <Space
      // block={true}
      direction={'vertical'}
      size={['middle']}
      style={{
        textAlign: 'left'
      }}
    // align-text='left'
    >
      <Card
        title={"Question"}
        bordered={false}
        style={{
          width: 1200,
          display: 'flex'
        }}
      >
        <Space

          style={{
            width: 1000,
            height: 75,
            justifyContent: 'space-between',
            // backgroundColor:'blue'
          }}
        >
          <pre>{assignment?.description}</pre>
          <strong>Language : {assignment?.title.toUpperCase()}</strong>
        </Space>


      </Card>
      <CodeMirror
        value={code}
        height="200px"
        theme={dracula}
        maxWidth='95%'
        //   style={{textAlign:'left'}}
        extensions={langDict[assignment?.title]}
        //   extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
          setCode(value)
        }}
      //   onChange={(e)=>{setCode(e.toLowerCase()); console.log(e.toLowerCase());}}
      >
      </CodeMirror>
      <Layout hasSider>
        <Content>
          <Tabs activeKey={currentKey} items={items} onChange={onChange} />;
          {/* {output
        ?
        <Card style={{color:'whitesmoke', backgroundColor:'black',height:'100%', width:'94%'}}>
          <p style={{color:'lightgreen'}}>Output : </p>
        <span style={{ maxWidth:'95%', wordBreak:'break-all', whiteSpace:'pre-line'}}>
          {output}</span>
        </Card> 
        : null} */}

          {/* {error
            ?
            <Card style={{ color: 'red', backgroundColor: 'black', height: '100%', width: '94%' }}>
              <p style={{ color: 'yellow' }}>Error : </p>
              <span style={{ maxWidth: '95%', wordBreak: 'break-all', whiteSpace: 'pre-line' }}>{error}</span>
            </Card>
            : null} */}
        </Content>
        <Sider style={{
          //  textAlign: 'center',
          overflow: 'auto',
          minHeight: 140,
          height: 180,
          // lineHeight: 2,
          display: 'flex',
          flexDirection: 'column',

          marginRight: 60,
        }}>
          <Card style={{ height: 90, borderRadius: 0 }}>

            <Button style={{ width: '100%' }} onClick={show}>Compile</Button>
          </Card>
          <Card style={{ height: 90, borderRadius: 0 }}>
            <Button style={{ width: '100%' }} onClick={show}>Submit</Button>
          </Card>

        </Sider>
      </Layout>
    </Space>
  )
}

export default CodeEditor