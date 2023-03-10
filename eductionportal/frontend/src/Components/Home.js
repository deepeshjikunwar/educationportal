import '../CSS/Home.css';
import pic from '../images/pic.svg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

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
                <img className='home-img' src={pic} alt="Educational Portal"></img>
            </div>
            <div className='home-content'>
                <h1>Educational Portal</h1>
                <p>Get access to a wide range of educational resources, from online courses to study materials, and advance your knowledge and skills.</p>
                <div className="home-btns">
                    <button className='btn' onClick={() => { navigate('/login_admin') }}>Are You A Educator</button>
                    <button className='btn' onClick={() => { navigate('/login_user') }}>Are You A Learner</button>
                </div>
            </div>
        </div>
    )
}

export default Home;
