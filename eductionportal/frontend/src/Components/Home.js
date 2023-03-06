import '../CSS/Home.css'
import  download from '../images/download.jpg'
import pic from '../images/pic.svg'
import { useNavigate } from 'react-router-dom'
const Home=()=>{

    const navigate = useNavigate();

return(
    <>
        <div className="img-div">
             <img src={pic}></img>
        </div>
        <div className='content-div'>
            <h1>Welcome to our <span style={{color:"salmon",fontSize:"35px","fontFamily":"monospace"}}>Educational</span> Portal</h1>
        </div>
        <button className='btn' onClick={()=>{navigate('/login_admin')}}>Admin</button>
        <button  className='btn' onClick={()=>{navigate('/login_user')}}>User</button>
    </>
    
)
}
export default Home;