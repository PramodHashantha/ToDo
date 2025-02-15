import React from 'react'
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCard = ({title, body, id, delid, display, updateId, toBeUpdate}) => {
  return (
    <div className='todo-card p-3'>
        <div>
            <h5>{title}</h5>
            <p className='todo-card-p'>
                {body && body.length > 77 ? body.substring(0, 77) : body}...
            </p>
        </div>
        <div className='d-flex justify-content-end '>
            <div    className='d-flex justify-content-center align-items-center px-2 py-1 text-danger card-icons-head' 
                    onClick={() => {
                        display('block');
                        toBeUpdate(updateId);
                    }}>
                <GrDocumentUpdate className='card-icons del' />Update
            </div>
            <div className='d-flex justify-content-center align-items-center px-2 py-1 card-icons-head' 
                    onClick={() => delid(id)}>
                <MdDelete  className='card-icons'/>Delete
            </div>
        </div>
    </div>
  )
}

export default TodoCard