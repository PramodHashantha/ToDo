import React from 'react'
import './signup.css'
import HeadingComp from './HeadingComp'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../config/config.js'

const Signup = () => {
    const navigate = useNavigate();
    const [Inputs, setInputs] = useState({email: '', username: '', password: ''})
    const change = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name]: value})
    }

    const submit = async (e) =>  {
        e.preventDefault();
        await axios.post(`${API_URL}/api/auth/register`, Inputs).then((res) => {
            if (res.data.message === 'User Already Exists'){
                alert(res.data.message);
            }else{
                alert(res.data.message);
                console.log(res);
                setInputs({email: '', username: '', password: ''})
                navigate('/signin')
            }
        });
    }

    
  return (
    <div className='signup'>
        <div className='container'>
            <div className="row">
                <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                    <div className='d-flex flex-column  w-100 p-3'>
                        <input className='p-2 my-3 input-signup' 
                                type='email' 
                                name ='email' 
                                placeholder='Enter your email'
                                onChange={change}
                                value={Inputs.email}/>

                        <input className='p-2 my-3 input-signup' 
                                type='username' 
                                name ='username' 
                                placeholder='Enter your username'
                                onChange={change}
                                value={Inputs.username}/>

                        <input className='p-2 my-3 input-signup' 
                                type='password' 
                                name ='password' 
                                placeholder='Enter your password'
                                onChange={change}
                                value={Inputs.password}/>

                        <button className='signup-btn p-2' onClick={submit}>Signup</button>
                    </div>
                </div>
                <div className="d-lg-flex d-none col-lg-4  col-left column d-flex justify-content-center align-items-center">
                    <HeadingComp first='Sign' second='Up'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup