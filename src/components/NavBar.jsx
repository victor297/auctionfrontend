import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiSolidUserRectangle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";

function NavBar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary mb-3 text-warning'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='text-warning'>
              <h2>
                <strong>SELLIT</strong>
              </h2>
            </Navbar.Brand>
          </LinkContainer>

          <div>
            <LinkContainer to='/Login'>
              <Navbar.Brand className='text-warning'>
                <BiSolidUserRectangle />
              </Navbar.Brand>
            </LinkContainer>

            <LinkContainer to='/cart'>
              <Navbar.Brand className='text-warning'>
                <BsFillCartCheckFill />
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          </div>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                USED
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Form className='d-flex me-3 w-50'>
                  <Form.Control
                    type='search'
                    placeholder='Search'
                    className='me-2'
                    aria-label='Search'
                  />
                  <Button variant='warning'>Search</Button>
                </Form>

                {auth._id ? (
                  <>
                    {" "}
                    <LinkContainer to='/'>
                      <Navbar.Brand className='text-success'>Home</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to='/cart'>
                      <Navbar.Brand className='text-success'>Cart</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to='/Productlist'>
                      <Navbar.Brand className='text-success'>
                        My products
                      </Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to='/sell'>
                      <Navbar.Brand className='text-warning'>
                        <strong>SELL NOW</strong>
                      </Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to='/'>
                      <Navbar.Brand
                        className='text-success'
                        onClick={() => {
                          dispatch(logoutUser(null));
                          toast.warning("Logged out", {
                            position: "bottom-left",
                          });
                        }}
                      >
                        LogOut
                      </Navbar.Brand>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    <LinkContainer to='/'>
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                      <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/cart'>
                      <Nav.Link>Cart</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/Productlist'>
                      <Nav.Link>My products</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
