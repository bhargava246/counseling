"use client"

import { useState, useEffect } from "react"
import { Form, Button, Row, Col, Card, Tabs, Tab } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { getStudentProfile, updateStudentProfile } from "../actions/studentActions"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"
import { STUDENT_UPDATE_PROFILE_RESET } from "../constants/studentConstants"

const ProfileScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [key, setKey] = useState("personal")

  // Personal Information
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [bio, setBio] = useState("")

  // Academic Information
  const [school, setSchool] = useState("")
  const [grade, setGrade] = useState("")
  const [gpa, setGpa] = useState("")
  const [mathMarks, setMathMarks] = useState("")
  const [scienceMarks, setScienceMarks] = useState("")
  const [englishMarks, setEnglishMarks] = useState("")
  const [socialStudiesMarks, setSocialStudiesMarks] = useState("")
  const [interests, setInterests] = useState("")

  // College Preferences
  const [preferredPrograms, setPreferredPrograms] = useState("")
  const [preferredLocations, setPreferredLocations] = useState("")
  const [collegeType, setCollegeType] = useState("")
  const [budgetRange, setBudgetRange] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success: successUpdate } = userUpdateProfile

  const studentProfile = useSelector((state) => state.studentProfile)
  const { loading: loadingStudent, error: errorStudent, student } = studentProfile

  const studentUpdateProfile = useSelector((state) => state.studentUpdateProfile)
  const {
    loading: loadingStudentUpdate,
    error: errorStudentUpdate,
    success: successStudentUpdate,
  } = studentUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user || !user.name || successUpdate) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails("profile"))
      } else {
        setName(user.name)
        setEmail(user.email)
      }

      if (userInfo.role === "student") {
        if (!student || successStudentUpdate) {
          dispatch({ type: STUDENT_UPDATE_PROFILE_RESET })
          dispatch(getStudentProfile())
        } else {
          // Personal Information
          setPhone(student.phone || "")
          setAddress(student.address || "")
          setCity(student.city || "")
          setState(student.state || "")
          setZipCode(student.zipCode || "")
          setBio(student.bio || "")

          // Academic Information
          setSchool(student.school || "")
          setGrade(student.grade || "")
          setGpa(student.gpa || "")
          setMathMarks(student.marks.math || "")
          setScienceMarks(student.marks.science || "")
          setEnglishMarks(student.marks.english || "")
          setSocialStudiesMarks(student.marks.socialStudies || "")
          setInterests(student.interests.join(", ") || "")

          // College Preferences
          setPreferredPrograms(student.preferences.programs.join(", ") || "")
          setPreferredLocations(student.preferences.locations.join(", ") || "")
          setCollegeType(student.preferences.collegeType || "")
          setBudgetRange(student.preferences.budgetRange || "")
          setAdditionalNotes(student.preferences.notes || "")
        }
      }
    }
  }, [dispatch, navigate, userInfo, user, student, successUpdate, successStudentUpdate])

  const submitAccountHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const submitPersonalHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateStudentProfile({
        phone,
        address,
        city,
        state,
        zipCode,
        bio,
      }),
    )
  }

  const submitAcademicHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateStudentProfile({
        school,
        grade,
        gpa,
        marks: {
          math: mathMarks,
          science: scienceMarks,
          english: englishMarks,
          socialStudies: socialStudiesMarks,
        },
        interests: interests.split(",").map((item) => item.trim()),
      }),
    )
  }

  const submitPreferencesHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateStudentProfile({
        preferences: {
          programs: preferredPrograms.split(",").map((item) => item.trim()),
          locations: preferredLocations.split(",").map((item) => item.trim()),
          collegeType,
          budgetRange,
          notes: additionalNotes,
        },
      }),
    )
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {successUpdate && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitAccountHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {userInfo && userInfo.role === "student" ? (
          <>
            <h2>Student Profile</h2>
            {errorStudent && <Message variant="danger">{errorStudent}</Message>}
            {errorStudentUpdate && <Message variant="danger">{errorStudentUpdate}</Message>}
            {successStudentUpdate && <Message variant="success">Profile Updated</Message>}
            {loadingStudent || loadingStudentUpdate ? (
              <Loader />
            ) : (
              <Card>
                <Card.Body>
                  <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 profile-tabs">
                    <Tab eventKey="personal" title="Personal Information">
                      <Form onSubmit={submitPersonalHandler}>
                        <Row>
                          <Col md={6}>
                            <Form.Group controlId="phone" className="mb-3">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="address" className="mb-3">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
                            <Form.Group controlId="city" className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group controlId="state" className="mb-3">
                              <Form.Label>State</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group controlId="zipCode" className="mb-3">
                              <Form.Label>Zip Code</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter zip code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group controlId="bio" className="mb-3">
                          <Form.Label>Bio</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us about yourself"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                          ></Form.Control>
                          <Form.Text className="text-muted">
                            Brief description about yourself. This helps counselors understand your background.
                          </Form.Text>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                          Update Personal Information
                        </Button>
                      </Form>
                    </Tab>
                    <Tab eventKey="academic" title="Academic Information">
                      <Form onSubmit={submitAcademicHandler}>
                        <Row>
                          <Col md={6}>
                            <Form.Group controlId="school" className="mb-3">
                              <Form.Label>School Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter school name"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group controlId="grade" className="mb-3">
                              <Form.Label>Grade/Year</Form.Label>
                              <Form.Select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                <option value="">Select grade</option>
                                <option value="9">9th Grade</option>
                                <option value="10">10th Grade</option>
                                <option value="11">11th Grade</option>
                                <option value="12">12th Grade</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group controlId="gpa" className="mb-3">
                              <Form.Label>GPA</Form.Label>
                              <Form.Control
                                type="number"
                                step="0.1"
                                min="0"
                                max="4"
                                placeholder="Enter GPA"
                                value={gpa}
                                onChange={(e) => setGpa(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>

                        <h5 className="mt-3">Subject Marks</h5>
                        <Row>
                          <Col md={3}>
                            <Form.Group controlId="mathMarks" className="mb-3">
                              <Form.Label>Mathematics</Form.Label>
                              <Form.Control
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Marks out of 100"
                                value={mathMarks}
                                onChange={(e) => setMathMarks(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group controlId="scienceMarks" className="mb-3">
                              <Form.Label>Science</Form.Label>
                              <Form.Control
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Marks out of 100"
                                value={scienceMarks}
                                onChange={(e) => setScienceMarks(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group controlId="englishMarks" className="mb-3">
                              <Form.Label>English</Form.Label>
                              <Form.Control
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Marks out of 100"
                                value={englishMarks}
                                onChange={(e) => setEnglishMarks(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group controlId="socialStudiesMarks" className="mb-3">
                              <Form.Label>Social Studies</Form.Label>
                              <Form.Control
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Marks out of 100"
                                value={socialStudiesMarks}
                                onChange={(e) => setSocialStudiesMarks(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group controlId="interests" className="mb-3">
                          <Form.Label>Academic Interests</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Comma-separated list of interests"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                          ></Form.Control>
                          <Form.Text className="text-muted">
                            List your academic interests and subjects you enjoy (e.g., Computer Science, Mathematics,
                            Physics).
                          </Form.Text>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                          Update Academic Information
                        </Button>
                      </Form>
                    </Tab>
                    <Tab eventKey="preferences" title="College Preferences">
                      <Form onSubmit={submitPreferencesHandler}>
                        <Form.Group controlId="preferredPrograms" className="mb-3">
                          <Form.Label>Preferred Programs/Majors</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Comma-separated list of programs"
                            value={preferredPrograms}
                            onChange={(e) => setPreferredPrograms(e.target.value)}
                          ></Form.Control>
                          <Form.Text className="text-muted">
                            List the programs or majors you're interested in studying.
                          </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="preferredLocations" className="mb-3">
                          <Form.Label>Preferred Locations</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Comma-separated list of locations"
                            value={preferredLocations}
                            onChange={(e) => setPreferredLocations(e.target.value)}
                          ></Form.Control>
                          <Form.Text className="text-muted">
                            List the cities, states, or regions where you'd like to study.
                          </Form.Text>
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group controlId="collegeType" className="mb-3">
                              <Form.Label>College Type</Form.Label>
                              <Form.Select value={collegeType} onChange={(e) => setCollegeType(e.target.value)}>
                                <option value="">Select college type</option>
                                <option value="University">University</option>
                                <option value="College">College</option>
                                <option value="Institute">Institute</option>
                                <option value="Community College">Community College</option>
                                <option value="Any">Any</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="budgetRange" className="mb-3">
                              <Form.Label>Budget Range</Form.Label>
                              <Form.Select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)}>
                                <option value="">Select budget range</option>
                                <option value="low">Low (Under $15,000/year)</option>
                                <option value="medium">Medium ($15,000-$30,000/year)</option>
                                <option value="high">High ($30,000-$50,000/year)</option>
                                <option value="very-high">Very High (Over $50,000/year)</option>
                                <option value="any">Any</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group controlId="additionalNotes" className="mb-3">
                          <Form.Label>Additional Notes</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Any additional preferences or requirements"
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                          ></Form.Control>
                          <Form.Text className="text-muted">
                            Any other preferences or requirements for your college search.
                          </Form.Text>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                          Update College Preferences
                        </Button>
                      </Form>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            )}
          </>
        ) : (
          <Message>Admin profile settings</Message>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen

