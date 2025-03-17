"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { login } from "../actions/userActions"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [key, setKey] = useState("signin")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/dashboard"

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard")
      } else {
        navigate(redirect)
      }
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const setDemoAccount = (type) => {
    if (type === "admin") {
      setEmail("admin@example.com")
      setPassword("password123")
    } else {
      setEmail("student@example.com")
      setPassword("password123")
    }
  }

  return (
    <FormContainer>
      <h1 className="text-center">Welcome Back</h1>
      <p className="text-center text-muted mb-4">Enter your credentials to sign in to your account</p>

      <Tabs id="login-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="signin" title="Sign In">
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New User? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="demo" title="Demo Accounts">
          <div className="p-3 border rounded mb-3">
            <h5>Admin Account</h5>
            <p className="mb-1 text-muted">Email: admin@example.com</p>
            <p className="text-muted">Password: password123</p>
            <Button variant="outline-primary" size="sm" className="w-100" onClick={() => setDemoAccount("admin")}>
              Use Admin Account
            </Button>
          </div>
          <div className="p-3 border rounded">
            <h5>Student Account</h5>
            <p className="mb-1 text-muted">Email: student@example.com</p>
            <p className="text-muted">Password: password123</p>
            <Button variant="outline-primary" size="sm" className="w-100" onClick={() => setDemoAccount("student")}>
              Use Student Account
            </Button>
          </div>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default LoginScreen

