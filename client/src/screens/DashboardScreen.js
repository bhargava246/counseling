"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Card, Button, ProgressBar, Tabs, Tab } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { FaGraduationCap, FaSchool, FaCalendarAlt, FaChartLine } from "react-icons/fa"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getStudentProfile } from "../actions/studentActions"
import { getRecommendedColleges } from "../actions/collegeActions"
import { getStudentSessions } from "../actions/sessionActions"

const DashboardScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const studentProfile = useSelector((state) => state.studentProfile)
  const { loading, error, student } = studentProfile

  const collegeRecommendations = useSelector((state) => state.collegeRecommendations)
  const { loading: loadingColleges, error: errorColleges, colleges } = collegeRecommendations

  const studentSessions = useSelector((state) => state.studentSessions)
  const { loading: loadingSessions, error: errorSessions, sessions } = studentSessions

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else if (userInfo.role === "admin") {
      navigate("/admin/dashboard")
    } else {
      dispatch(getStudentProfile())
      dispatch(getRecommendedColleges())
      dispatch(getStudentSessions())
    }
  }, [dispatch, navigate, userInfo])

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!student) return 0

    let completedFields = 0
    let totalFields = 0

    // Personal info
    if (student.phone) completedFields++
    if (student.address) completedFields++
    if (student.city) completedFields++
    if (student.state) completedFields++
    if (student.zipCode) completedFields++
    if (student.bio) completedFields++
    totalFields += 6

    // Academic info
    if (student.school) completedFields++
    if (student.grade) completedFields++
    if (student.gpa > 0) completedFields++
    if (student.marks.math > 0) completedFields++
    if (student.marks.science > 0) completedFields++
    if (student.marks.english > 0) completedFields++
    if (student.marks.socialStudies > 0) completedFields++
    if (student.interests.length > 0) completedFields++
    totalFields += 8

    // Preferences
    if (student.preferences.programs.length > 0) completedFields++
    if (student.preferences.locations.length > 0) completedFields++
    if (student.preferences.collegeType) completedFields++
    if (student.preferences.budgetRange) completedFields++
    totalFields += 4

    return Math.round((completedFields / totalFields) * 100)
  }

  return (
    <>
      <h1>Student Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="dashboard-stats mb-4">
            <Col md={3}>
              <Card>
                <Card.Body>
                  <div className="card-icon">
                    <FaChartLine />
                  </div>
                  <Card.Title>Profile Completion</Card.Title>
                  <Card.Text>{calculateProfileCompletion()}%</Card.Text>
                  <ProgressBar
                    now={calculateProfileCompletion()}
                    variant={
                      calculateProfileCompletion() < 50
                        ? "danger"
                        : calculateProfileCompletion() < 80
                          ? "warning"
                          : "success"
                    }
                    className="mt-2"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <div className="card-icon">
                    <FaSchool />
                  </div>
                  <Card.Title>College Matches</Card.Title>
                  <Card.Text>{colleges ? colleges.length : 0}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <div className="card-icon">
                    <FaCalendarAlt />
                  </div>
                  <Card.Title>Upcoming Sessions</Card.Title>
                  <Card.Text>
                    {sessions ? sessions.filter((session) => session.status !== "Completed").length : 0}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <div className="card-icon">
                    <FaGraduationCap />
                  </div>
                  <Card.Title>Academic Score</Card.Title>
                  <Card.Text>
                    {student && student.marks
                      ? Math.round(
                          (student.marks.math +
                            student.marks.science +
                            student.marks.english +
                            student.marks.socialStudies) /
                            4,
                        )
                      : 0}
                    %
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Tabs defaultActiveKey="recommendations" id="dashboard-tabs" className="mb-3">
            <Tab eventKey="recommendations" title="College Recommendations">
              {loadingColleges ? (
                <Loader />
              ) : errorColleges ? (
                <Message variant="danger">{errorColleges}</Message>
              ) : colleges && colleges.length === 0 ? (
                <Message>
                  No college recommendations yet. Please complete your profile and academic information.
                </Message>
              ) : (
                <>
                  <Row>
                    {colleges &&
                      colleges.slice(0, 6).map((college) => (
                        <Col key={college._id} sm={12} md={6} lg={4} className="mb-4">
                          <Card className="college-card">
                            <div className="match-score">{college.matchScore}%</div>
                            <Card.Body>
                              <Card.Title>{college.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{college.location}</Card.Subtitle>
                              <Card.Text>
                                <strong>Type:</strong> {college.type}
                                <br />
                                <strong>Cutoff:</strong> {college.cutoffMarks}%
                                <br />
                                <strong>Programs:</strong> {college.programs.slice(0, 2).join(", ")}
                                {college.programs.length > 2 && "..."}
                              </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                              <Link to={`/colleges/${college._id}`}>
                                <Button variant="primary" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </Card.Footer>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                  <div className="text-center mt-3">
                    <Link to="/colleges">
                      <Button variant="outline-primary">View All Recommendations</Button>
                    </Link>
                  </div>
                </>
              )}
            </Tab>
            <Tab eventKey="sessions" title="Counseling Sessions">
              {loadingSessions ? (
                <Loader />
              ) : errorSessions ? (
                <Message variant="danger">{errorSessions}</Message>
              ) : sessions && sessions.length === 0 ? (
                <Message>
                  No counseling sessions yet. <Link to="/counseling">Book your first session</Link>
                </Message>
              ) : (
                <>
                  <h3>Upcoming Sessions</h3>
                  {sessions && sessions.filter((session) => session.status !== "Completed").length > 0 ? (
                    <Row>
                      {sessions
                        .filter((session) => session.status !== "Completed")
                        .map((session) => (
                          <Col key={session._id} md={6} className="mb-3">
                            <Card className="session-card">
                              <Card.Header>
                                <strong>{session.topic}</strong>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
                                  <br />
                                  <strong>Time:</strong> {session.time}
                                  <br />
                                  <strong>Duration:</strong> {session.duration}
                                  <br />
                                  <strong>Counselor:</strong> {session.counselor ? session.counselor.name : "TBD"}
                                  <br />
                                  <strong>Status:</strong>{" "}
                                  <span
                                    className={`badge ${
                                      session.status === "Confirmed" ? "bg-success" : "bg-warning text-dark"
                                    }`}
                                  >
                                    {session.status}
                                  </span>
                                </Card.Text>
                              </Card.Body>
                              <Card.Footer className="d-flex justify-content-between">
                                <Button variant="outline-secondary" size="sm" as={Link} to={`/sessions/${session._id}`}>
                                  Details
                                </Button>
                                {session.status === "Confirmed" && (
                                  <Button variant="primary" size="sm">
                                    Join Session
                                  </Button>
                                )}
                              </Card.Footer>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  ) : (
                    <Message variant="info">No upcoming sessions</Message>
                  )}

                  <div className="text-center mt-3 mb-4">
                    <Link to="/counseling">
                      <Button variant="primary">Book New Session</Button>
                    </Link>
                  </div>

                  <h3>Past Sessions</h3>
                  {sessions && sessions.filter((session) => session.status === "Completed").length > 0 ? (
                    <Row>
                      {sessions
                        .filter((session) => session.status === "Completed")
                        .map((session) => (
                          <Col key={session._id} md={6} className="mb-3">
                            <Card className="session-card">
                              <Card.Header>
                                <strong>{session.topic}</strong>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
                                  <br />
                                  <strong>Time:</strong> {session.time}
                                  <br />
                                  <strong>Duration:</strong> {session.duration}
                                  <br />
                                  <strong>Counselor:</strong> {session.counselor ? session.counselor.name : "TBD"}
                                </Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <Button variant="outline-secondary" size="sm" as={Link} to={`/sessions/${session._id}`}>
                                  View Notes
                                </Button>
                              </Card.Footer>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  ) : (
                    <Message variant="info">No past sessions</Message>
                  )}
                </>
              )}
            </Tab>
          </Tabs>
        </>
      )}
    </>
  )
}

export default DashboardScreen

