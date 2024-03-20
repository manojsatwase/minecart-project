import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShowHidePassword from '../components/ShowPasswordFeature/ShowHidePassword';
import MainScreen from '../components/MainScreen/MainScreen';
import { loginUserAPI } from '../api/userApiCall';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
   const dispatch = useDispatch();

  const {loading} = useSelector(state => state?.userInfo);
 
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const submitHandler = (e) => {
    e.preventDefault();
    // Your login logic goes here
    dispatch(loginUserAPI(email, password));
  };


  return (
    <>
      <MainScreen title="LOGIN">
        <Button variant="primary" onClick={handleShowModal}>
          Open Login Modal
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
            <Button onClick={handleCloseModal}>
                &times;
             </Button>
          </Modal.Header>
          <Modal.Body>
            {/* {error && <div className="text-danger">{error}</div>} */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChangeEmail}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className='my-3'>
                <Form.Label>Password</Form.Label>
                <ShowHidePassword
                  title="Password"
                  inputComponent={
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChangePassword}
                      required
                    />
                  }
                />
              </Form.Group>
              <Button disabled={loading} variant="primary" className='mt-3' type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          
            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </MainScreen>
    </>
  );
};

export default Login;
