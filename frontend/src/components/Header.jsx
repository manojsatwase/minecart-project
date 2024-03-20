import { useEffect, useState } from 'react';
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { capitalize,PICS} from '../utils/capitalize';
import { logoutUserAPI } from '../api/userApiCall';
import {useAlert} from "react-alert";
import { clearErrors, clearMessage } from '../redux/slices/userSlice';
import LoadingSpinner from './LoadingSpinner';

const Header = () => {
  const [searchText,setSearchText] = useState('');
  const dispatch = useDispatch();
  
  const {error,message,loading,isAuthenticated} = useSelector(state=>state.userInfo);
  const alert = useAlert();
  const Logout = () => {
      dispatch(logoutUserAPI());
  }

  const onChangeHandler = ({target:{value}}) => {
    setSearchText(value)
  }

  useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors());
      }
   if(message){
    alert.success(message)
    dispatch(clearMessage())
   }
  },[error,alert,dispatch,message])
  
  useEffect(()=>{
      const timer = setTimeout(() => {
        // dispatch(searchProducts(searchText));
      }, 500);
  
      return () => {
        clearTimeout(timer);
      };
    }, [searchText,dispatch]);

    useEffect(()=>{
      // dispatch(createProducts());
    },[dispatch]);
  
    if(loading) return <LoadingSpinner size="2rem" className="custom-spinner" />


    return (
      <Navbar expand="lg" bg="primary" variant='dark' className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/">MineCart</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          {/* Conditional rendering based on user authentication */}
          {true ? (
            <Navbar.Collapse id="navbarScroll">
              <Nav className="m-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Form className="d-flex" style={{width:"250px"}}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchText}
                    onChange={onChangeHandler}
                  />
                </Form>
              </Nav>
              {/* Cart icon and link */}
              <Link to="/products/cart" className="nav-link cart-link">
                <i className="bi bi-cart"></i>
              </Link>
              <Link to="/products" className="nav-link cart-link">
                  products
              </Link>
              {
                isAuthenticated &&(
                  <>
                    <img src={PICS} className='userProfile' lazy="loading" alt='user' />
                    <NavDropdown className='mx-3' title={capitalize("manoj"?.name)} id="navbarScrollingDropdown"> 
                      <Link className='p-4' to="/myprofile">My Profile</Link>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )
              }
             
            </Navbar.Collapse>
          ) : (
            <Link className='ml-auto' to="/login">Login</Link>
          )}
        </Container>
      </Navbar>
    )
  }
  
  export default Header;