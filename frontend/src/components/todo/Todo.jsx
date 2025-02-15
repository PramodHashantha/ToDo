import React from 'react'
import './todo.css'
import { useState } from 'react'
import TodoCard from './TodoCard'
import { ToastContainer, toast } from 'react-toastify';
import Update from './Update';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [Inputs, setInputs] = useState({title: '', body: ''})
    const [Array, setArray] = useState([]);
    const [id, setId] = useState(sessionStorage.getItem('userId') || null);
    const [toUpdateArray, setToUpdateArray] = useState(null);

    useEffect(() => {
        setId(sessionStorage.getItem('userId')); // Ensure the id updates dynamically
    }, []);

    const fetchTasks = async () => {
        if (!id) return; // Prevent API call if no user is logged in
        try {
            const res = await axios.get(`http://localhost:8000/api/list/getTask/${id}`);
            setArray(res.data.list);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [id]);

    const submit = async () => {
        if (!Inputs.title || !Inputs.body) {
            toast.error('Please fill all the fields');
            return;
        }

        if (id) {
            try {
                await axios.post(`http://localhost:8000/api/list/addTask`, {
                    title: Inputs.title,
                    body: Inputs.body,
                    id: id,
                });

                toast.success('Task Added');
                fetchTasks(); // Refresh the tasks list
            } catch (error) {
                console.error('Error adding task:', error);
            }
        } else {
            toast.warning('Task is not saved, please sign in');
            setArray([...Array, Inputs]);
        }

        setInputs({ title: '', body: '' });
    };

    const del = async (Cardid) => {
        if (!id) {
            toast.error('Please sign in to delete task');
            return;
        }
        try {
            await axios.delete(`http://localhost:8000/api/list/deleteTask/${Cardid}`, { data: { id: id } });
            toast.success('Task Deleted');
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const update = (index) => {
        setToUpdateArray(Array[index]);
    };

    const dis = (value) => {
        document.getElementById('todo-update').style.display = value;
    };


    const show = () => {
        document.getElementById('textarea').style.display = 'block'
    }

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const change = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name]: value})
    }

  return (
    <>
        <div className='todo'>
        <ToastContainer/>
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column my-4">
            <div className="d-flex flex-column todo-inputs-div w-100 p-1">
                <input type="text" 
                    placeholder='Title' 
                    className='my-2 p-2 todo-inputs' 
                    onClick={show} 
                    onChange={change} 
                    name='title'
                    value={Inputs.title}/>

                <textarea 
                    type="text" 
                    placeholder='Description' 
                    name='body' 
                    id='textarea' 
                    className='p-2 todo-inputs' 
                    onChange={change}
                    value={Inputs.body}/>
            </div>
            <div className="d-flex justify-content-end w-50 my-3 w-lg-50 w-100">
                <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
            </div>
        </div>            
        <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">
                        {Array && Array.map((item, index) => (
                        <div className='col-lg-3 my-2 col-11 mx-lg-5 mx-3' key={index}>
                            <TodoCard title={item.title} 
                                        body={item.body} 
                                        id={item._id} 
                                        delid={del} 
                                        display={dis}
                                        updateId={index}
                                        toBeUpdate={update}/>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        </div>
        <div className="todo-update" id='todo-update'>
            <div className="container">
                <Update display={dis} update={toUpdateArray}/>
            </div>
            
        </div>
    </>
  )
}

export default Todo