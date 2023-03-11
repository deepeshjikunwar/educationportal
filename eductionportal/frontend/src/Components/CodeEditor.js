import { Button, Card, Space } from 'antd'
import React,{useState} from 'react'
import axios from '../Api/axiosCode'
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import { StreamLanguage } from '@codemirror/language';
// import { pythonLanguage } from '@codemirror/lang-python/dist';


function CodeEditor() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
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
      <CodeMirror
          value={code}
          height="200px"
          theme={dracula}
        //   style={{textAlign:'left'}}
          extensions={[python({ jsx: true })]}
    //   extensions={[javascript({ jsx: true })]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
        setCode(value)
      }}
        //   onChange={(e)=>{setCode(e.toLowerCase()); console.log(e.toLowerCase());}}
        >
        </CodeMirror>
      <Card
        title={"Question"}
        bordered={false}
        style={{
            width: 1200,
        }}
      >
        <p>Language : Python</p>
        <h4>Write Function to Add 2 Numbers</h4>
        <br />
        Output : <p style={{color:'whitesmoke', backgroundColor:'black'}}>{output}</p>
        Error : <p style={{color:'red', backgroundColor:'black'}}>{error}</p>

        <Button onClick={show}>Submit</Button>
      </Card>
        <Button onClick={show}>Compile</Button>
      </Space>
  )
}

export default CodeEditor