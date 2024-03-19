import { useEffect, useState } from 'react';
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize,PICS} from '../utils/capitalize';

const Header = () => {
  const [searchText,setSearchText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userInfo = useSelector(state=>state.createUser.userInfo);
  
  const Logout = () => {
    removeUserToLocalStorage();
    navigate("/");
  }

  const onChangeHandler = ({target:{value}}) => {
    setSearchText(value)
  }
  useEffect(()=>{
      const timer = setTimeout(() => {
        // dispatch(searchProducts(searchText));
      }, 500);
  
      return () => {
        clearTimeout(timer);
      };
    }, [searchText,dispatch]);

    useEffect(()=>{
      // dispatch(createProducts(getUserToLocalStorage()));
    },[dispatch]);
  

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
              <img src={PICS} className='userProfile' lazy="loading" alt='user' />
              <NavDropdown className='mx-3' title={capitalize("manoj"?.name)} id="navbarScrollingDropdown"> 
                <Link className='p-4' to="myprofile">My Profile</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          ) : (
            <Link className='ml-auto' to="/login">Login</Link>
          )}
        </Container>
      </Navbar>
    )
  }
  
  export default Header;