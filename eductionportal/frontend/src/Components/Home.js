import '../CSS/Home.css'
import download from '../images/download.jpg'
import pic from '../images/pic.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
const Home = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth) {
        console.log(auth);
    }
    console.log("In Home : " + auth);

    return (
        <div className='home'>
            <div className="img-div">
                <img className='home-img' src={pic}></img>
            </div>
            <div className='home-content'>
                <h1>Welcome to our <span style={{ color: "salmon", fontSize: "35px", "fontFamily": "monospace" }}>Educational</span> Portal</h1>
            </div>
            <div className="home-btns">

                <button className='btn' onClick={() => { navigate('/login_admin') }}>Admin</button>
                <button className='btn' onClick={() => { navigate('/login_user') }}>User</button>
            </div>
        </div>

    )
}
export default Home;