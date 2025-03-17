"use client"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { logout } from "../actions/userActions"

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>EduCounsel</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  {userInfo.role === "admin" ? (
                    <LinkContainer to="/admin/dashboard">
                      <Nav.Link>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/dashboard">
                      <Nav.Link>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user-plus"></i> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && userInfo.role === "admin" && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/students">
                    <NavDropdown.Item>Students</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/counseling">
                    <NavDropdown.Item>Counseling</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/colleges">
                    <NavDropdown.Item>Colleges</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

