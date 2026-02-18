import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VisitorForm from "./pages/VisitorForm";
import StudentApplication from "./pages/StudentApplication";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Student from "./pages/Student";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apply" element={<VisitorForm />} />
                <Route path="/student-application/*" element={<StudentApplication />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student" element={<Student />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
