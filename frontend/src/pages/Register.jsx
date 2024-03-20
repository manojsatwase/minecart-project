import React, { useState } from 'react';
import { Button, Form, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainScreen from '../components/MainScreen/MainScreen';
import { registerUserAPI } from '../api/userApiCall';

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [avatar,setAvatar] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");

  const { loading } = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const resetHandler = () => {
    setAvatar("");
    setUsername("")
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async e => {
    e.preventDefault();
     dispatch(registerUserAPI(username,email,password,avatar));
     resetHandler();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      // 0 means initial 
      // 1 processing
      // 2 process done
      if(Reader.readyState === 2){
        setAvatar(Reader.result);
      }
    }
  }
  return (
    <>
      <MainScreen title="REGISTER">
        <Button variant="primary" onClick={handleShowModal}>
          Open Register Modal
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
           <Modal.Header>
            <Modal.Title>REGISTER</Modal.Title>
            <Button onClick={handleCloseModal}>
                &times;
             </Button>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicAvatar">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px', // Rounded corners
                    padding: '8px',
                    width: '100%',
                    boxSizing: 'border-box', // Include padding in width
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicUsername" className='my-2'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={({target:{value}})=>setUsername(value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className='my-2'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={({target:{value}})=>setEmail(value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={({target:{value}})=>setPassword(value)}
                  required
                />
              </Form.Group>
              <Button disabled={loading} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/">
              <Button variant="primary">Login</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </MainScreen>
    </>
  );
};

export default Register;
