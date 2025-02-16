import React from 'react'
import './signin.css'
import HeadingComp from '../signup/HeadingComp'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'
import API_URL from '../../config/config.js'

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({email: '', password: ''})

  const change = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name]: value})
    }

    const submit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${API_URL}/api/auth/login`, Inputs);
        
        if (res.data.success) {  // Ensure login is successful before navigating
            console.log(res.data._id); 
            sessionStorage.setItem('userId', res.data._id);
            dispatch(authActions.login());
            navigate('/todo');
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Something went wrong. Please try again.');
    }
};

  return (
    <div>
      <div className='signup'>
        <div className='container'>
            <div className="row">
                <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                    <div className='d-flex flex-column  w-100 p-3'>
                        <input  className='p-2 my-3 input-signup' 
                                type='email' 
                                name ='email' 
                                placeholder='Enter your email'
                                value={Inputs.email}
                                onChange={change}/>

                        <input  className='p-2 my-3 input-signup' 
                                type='password' 
                                name ='password' 
                                placeholder='Enter your password'
                                value={Inputs.password}
                                onChange={change}/>

                        <button className='signup-btn p-2' onClick={submit}>SignIn</button>
                    </div>
                </div>
                <div className="col-lg-4  col-left d-lg-flex column justify-content-center align-items-center">
                    <HeadingComp first='Sign' second='In'/>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Signin