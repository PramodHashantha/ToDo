import React from 'react'
import './home.css'

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <h1 className='text-center'>
                Organize Your<br/> Work and life, finally.
            </h1>
            <p>
                Become focused,organized, amd calm with <br/>
                Todo. The world's #1 task manager.
            </p>
            <button className='home-btn p-2'>Make Todo List</button>
        </div>
    </div>
  )
}

export default Home