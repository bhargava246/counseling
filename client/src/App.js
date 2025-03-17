import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import DashboardScreen from "./screens/DashboardScreen"
import AdminDashboardScreen from "./screens/AdminDashboardScreen"
import StudentListScreen from "./screens/StudentListScreen"
import StudentDetailsScreen from "./screens/StudentDetailsScreen"
import CollegeListScreen from "./screens/CollegeListScreen"
import CollegeDetailsScreen from "./screens/CollegeDetailsScreen"
import CollegeEditScreen from "./screens/CollegeEditScreen"
import CounselingScreen from "./screens/CounselingScreen"
import AdminCounselingScreen from "./screens/AdminCounselingScreen"
import SessionDetailsScreen from "./screens/SessionDetailsScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
            <Route path="/admin/students" element={<StudentListScreen />} />
            <Route path="/admin/students/:id" element={<StudentDetailsScreen />} />
            <Route path="/colleges" element={<CollegeListScreen />} />
            <Route path="/colleges/:id" element={<CollegeDetailsScreen />} />
            <Route path="/admin/colleges/:id/edit" element={<CollegeEditScreen />} />
            <Route path="/counseling" element={<CounselingScreen />} />
            <Route path="/admin/counseling" element={<AdminCounselingScreen />} />
            <Route path="/sessions/:id" element={<SessionDetailsScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App

