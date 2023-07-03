import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from './popup';

const ToDoCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  const tdl = props.tdl;
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: ''
  });
  
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/tdl/${id}`)
      .then((res) => {
        setItem({
          name: res.data.name,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateBookInfo');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:4000/api/tdl/${id}`)
      .then((res) => {
        navigate('/');
        alert(tdl.name+'Delete')
      })
      .catch((err) => {
        console.log('Error form ShowItemDetails_deleteClick');
      });
  };

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmit = (id) => {
    const data = {
      name: item.name
    };

    axios
      .put(`http://localhost:4000/api/tdl/${id}`, data)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error in UpdateBookInfo!');
      });
  };
  

  return (
    <div>
        <p>{tdl.name}</p>
        <button onClick={togglePopup}>Edit</button>
        {isOpen && <Popup
            content={<>
              <h1>{tdl.name}</h1>
              <input
                type='text'
                placeholder='Game Console Name'
                name='name'
                className='form-control'
                onChange={onChange}
              />
              <button onClick={() => {onSubmit(tdl._id);}}>Confirm</button>
            </>}
            handleClose={togglePopup}
          />}
        <button onClick={() => {onDeleteClick(tdl._id);}}> Delete</button>
    </div>

  );
};



export default ToDoCard;