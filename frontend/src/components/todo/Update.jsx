import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Update = ({ display, update }) => {
  const [inputs, setInputs] = useState({ title: '', body: '' });

  useEffect(() => {
    if (update) {
      setInputs({ title: update.title || '', body: update.body || '' });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (!inputs.title || !inputs.body) {
        toast.error('Please fill all fields');
        return;
    }

    try {
        await axios.put(`http://localhost:8000/api/list/updateTask/${update._id}`, inputs);
        toast.success('Task Updated');

        // Optional: Reload or close the modal
        display('none');
    } catch (error) {
        console.error(error);
        toast.error('Error updating task');
    }
};

  return (
    <div className="p-5 d-flex justify-content-center align-items-center flex-column update">
      <h3>Update Your Task</h3>
      <input
        type="text"
        name="title"
        className="todo-inputs my-4 w-100 p-3"
        value={inputs.title}
        onChange={change}
      />
      <textarea
        name="body"
        className="todo-inputs p-3 w-100"
        value={inputs.body}
        onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>Update</button>
        <button className="btn btn-danger my-4 mx-3" onClick={() => display('none')}>Close</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Update;
