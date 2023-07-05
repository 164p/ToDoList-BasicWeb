import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ToDoCard from './ToDoCard.js'
import { useNavigate } from 'react-router-dom';

function ShowToDoList() {
  const [tdl, setItems] = useState({name: ''});
  const [tdl_l, settdl] = useState([]);
  const navigate = useNavigate();
  const onChange = (e) => {
    setItems({ ...tdl, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/tdl')
      .then((res) => {
        settdl(res.data);
      })
      .catch((err) => {
        console.log('Error from ToDoList');
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4000/api/tdl', tdl)
      .then((res) => {
        setItems({
            name: ''
        });
        navigate('/');
      })
      .catch((err) => {
        console.log('Error in CreateItem!');
      });
      window.location.reload()
  };

  const tdlList =
    tdl_l.length === 0
      ? 'No thing to do'
      : tdl_l.map((tdls, k) => <ToDoCard tdl={tdls} key={k} />);

  return (
    <div className='ShowBookList'>
      <h1>ToDoList</h1>
      <form noValidate onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Name...'
        name='name'
        className='form-control'
        value={tdl.name}
        onChange={onChange}
      />
      <input
        type='submit'
        className='btn btn-outline-warning btn-block mt-4'
      />
      </form>
      <div className='list'>{tdlList}</div>
    </div>
  );
}

export default ShowToDoList;