"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Card, Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { FaUsers, FaCalendarCheck, FaGraduationCap, FaSearch } from "react-icons/fa"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listStudents } from "../actions/studentActions"
import { getCounselorSessions } from "../actions/sessionActions"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const AdminDashboardScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const studentList = useSelector((state) => state.studentList)
  const { loading, error, students } = studentList

  const counselorSessions = useSelector((state) => state.counselorSessions)
  const { loading: loadingSessions, error: errorSessions, sessions } = counselorSessions

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login")
    } else {
      dispatch(listStudents())
      dispatch(getCounselorSessions())
    }
  }, [dispatch, navigate, userInfo])

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Counseling Sessions",
        data: [20, 25, 30, 35, 40, 45, 50],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "College Placements",
        data: [5, 8, 12, 15, 20, 25, 30],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Counseling and Placement Statistics",
      },
    },
  }

  return (
    <>
      <h1>Admin Dashboard</h1>
      <Row className="dashboard-stats mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <FaUsers />
              </div>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{students ? students.length : 0}</Card.Text>
              <Card.Text className="text-muted small">+12% from last month</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <FaCalendarCheck />
              </div>
              <Card.Title>Pending Sessions</Card.Title>
              <Card.Text>{sessions ? sessions.filter((session) => session.status === "Pending").length : 0}</Card.Text>
              <Card.Text className="text-muted small">+2 since yesterday</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <FaCalendarCheck />
              </div>
              <Card.Title>Completed Sessions</Card.Title>
              <Card.Text>
                {sessions ? sessions.filter((session) => session.status === "Completed").length : 0}
              </Card.Text>
              <Card.Text className="text-muted small">+19% from last month</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <FaGraduationCap />
              </div>
              <Card.Title>College Placements</Card.Title>
              <Card.Text>89</Card.Text>
              <Card.Text className="text-muted small">+10% from last month</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Overview</h5>
            </Card.Header>
            <Card.Body>
              <Bar data={chartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Students</h5>
              <Link to="/admin/students">
                <Button variant="link" size="sm" className="p-0">
                  View All
                </Button>
              </Link>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <div className="table-responsive">
                  <Table hover className="table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students &&
                        students.slice(0, 5).map((student) => (
                          <tr key={student._id}>
                            <td>{student.user.name}</td>
                            <td>{student.grade || "N/A"}</td>
                            <td>
                              <Link to={`/admin/students/${student._id}`}>
                                <Button variant="light" size="sm">
                                  <FaSearch />
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Upcoming Counseling Sessions</h5>
          <Link to="/admin/counseling">
            <Button variant="link" size="sm" className="p-0">
              View All
            </Button>
          </Link>
        </Card.Header>
        <Card.Body>
          {loadingSessions ? (
            <Loader />
          ) : errorSessions ? (
            <Message variant="danger">{errorSessions}</Message>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Topic</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions &&
                    sessions
                      .filter((session) => session.status === "Confirmed" || session.status === "Pending")
                      .slice(0, 5)
                      .map((session) => (
                        <tr key={session._id}>
                          <td>{session.student && session.student.user ? session.student.user.name : "N/A"}</td>
                          <td>{new Date(session.date).toLocaleDateString()}</td>
                          <td>{session.time}</td>
                          <td>{session.topic}</td>
                          <td>
                            <span
                              className={`badge ${
                                session.status === "Confirmed" ? "bg-success" : "bg-warning text-dark"
                              }`}
                            >
                              {session.status}
                            </span>
                          </td>
                          <td>
                            <Link to={`/sessions/${session._id}`}>
                              <Button variant="primary" size="sm">
                                View
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default AdminDashboardScreen

