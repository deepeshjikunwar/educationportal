import { Button, Card, Layout, Row, Space } from 'antd'
import React,{useContext, useState} from 'react'
import axios from '../Api/axiosCode'
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { StreamLanguage } from '@codemirror/language';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { python } from '@codemirror/lang-python';
import {cpp} from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { sql } from '@codemirror/lang-sql';
// import { pythonLanguage } from '@codemirror/lang-python/dist';
const {Sider, Content} = Layout;

function CodeEditor() {
  const {id} = useParams();
  const {auth} = useContext(AuthContext);
  
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [codeLang, setCodeLang] = useState('');

    var langDict = {
      "python" : python(),
      "cpp" : cpp(),
      "sql":sql(),
      "css":css(),
      "html":html(),
      "javascript":javascript(),
      "java":java()
    }

    const show =async () =>{
      try {
    
        const resp = await axios.post('',{
          "code":code,
          "language":"py",
          "input":""
        })
        console.log("Response : "+JSON.stringify(resp.data));
        setOutput(resp.data.output)
        setError(resp.data.error)
      } catch (error) {
        if(error.code === 'ERR_BAD_REQUEST'){
          setCode('')
          setError('')
          setOutput('')
        }
        console.log(error);
      }
    }

  return (
    <Space
    // block={true}
    direction={'vertical'}
    size={['middle']}
    style={{
        textAlign:'left'
    }}
    // align-text='left'
    >
      <Card
        title={"Question"}
        bordered={false}
        style={{
            width: 1200,
        }}
        >
        <p>Language : Python</p>
        <h4>Write Function to Add 2 Numbers</h4>
        </Card>
      <CodeMirror
          value={code}
          height="200px"
          theme={dracula}
          maxWidth='95%'
        //   style={{textAlign:'left'}}
          extensions={langDict['python']}
    //   extensions={[javascript({ jsx: true })]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
        setCode(value)
      }}
        //   onChange={(e)=>{setCode(e.toLowerCase()); console.log(e.toLowerCase());}}
        >
        </CodeMirror>
        <Layout hasSider>
          <Sider style={{
                //  textAlign: 'center',
                overflow:'auto',
                 minHeight: 120,
                 lineHeight: 2,
                 display:'flex',
                 flexDirection:'column',
                
                //  marginLeft:180,
          }}>
<Card >

        <Button style={{width:'100%'}} onClick={show}>Compile</Button>
</Card>
          <Card>
        <Button style={{width:'100%'}} onClick={show}>Submit</Button>
          </Card>
            
          </Sider>
          <Content>
        {output
        ?
        <Card style={{color:'whitesmoke', backgroundColor:'black',height:'100%', width:'94%'}}>
          <p style={{color:'lightgreen'}}>Output : </p>
        <span style={{ maxWidth:'95%', wordBreak:'break-all', whiteSpace:'pre-line'}}>
          {output}</span>
        </Card> 
        : null}

        {error 
        ? 
        <Card style={{color:'red', backgroundColor:'black',height:'100%', width:'94%'}}>
          <p style={{color:'yellow'}}>Error : </p>
        <span style={{ maxWidth:'95%', wordBreak:'break-all', whiteSpace:'pre-line'}}>{error}</span>
        </Card> 
        : null}
          </Content>
        </Layout>
      </Space>
  )
}

export default CodeEditor