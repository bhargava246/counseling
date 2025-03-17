import { Link } from "react-router-dom"
import { Row, Col, Image, Button, Card } from "react-bootstrap"
import { FaGraduationCap, FaChartLine, FaCalendarCheck, FaComments } from "react-icons/fa"

const HomeScreen = () => {
  return (
    <>
      <div className="py-5 bg-light rounded">
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Find Your Perfect College Match</h1>
            <p className="lead">
              Get personalized college recommendations based on your academic performance and receive expert counseling
              to make the right choice for your future.
            </p>
            <div className="d-flex gap-2">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline-primary" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </Col>
          <Col md={6}>
            <Image src="/images/hero.jpg" alt="College Counseling" fluid className="rounded" />
          </Col>
        </Row>
      </div>

      <h2 className="text-center my-5">How It Works</h2>
      <Row>
        <Col md={3}>
          <Card className="mb-4 h-100">
            <Card.Body className="text-center">
              <div className="mb-3">
                <FaGraduationCap size={50} className="text-primary" />
              </div>
              <Card.Title>Upload Marks</Card.Title>
              <Card.Text>Submit your academic records for personalized college recommendations.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 h-100">
            <Card.Body className="text-center">
              <div className="mb-3">
                <FaChartLine size={50} className="text-primary" />
              </div>
              <Card.Title>Get Recommendations</Card.Title>
              <Card.Text>Receive AI-powered college suggestions based on your academic performance.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 h-100">
            <Card.Body className="text-center">
              <div className="mb-3">
                <FaCalendarCheck size={50} className="text-primary" />
              </div>
              <Card.Title>Schedule Counseling</Card.Title>
              <Card.Text>Book one-on-one sessions with expert counselors.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 h-100">
            <Card.Body className="text-center">
              <div className="mb-3">
                <FaComments size={50} className="text-primary" />
              </div>
              <Card.Title>Ongoing Support</Card.Title>
              <Card.Text>Get continuous guidance through our chat system.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center my-5 py-5 bg-light rounded">
        <h2>Ready to Find Your Path?</h2>
        <p className="lead mb-4">
          Join thousands of students who found their perfect college match through our platform.
        </p>
        <Link to="/register">
          <Button variant="primary" size="lg">
            Sign Up Now
          </Button>
        </Link>
      </div>
    </>
  )
}

export default HomeScreen

