// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
<<<<<<< HEAD
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import SignUp from './components/SignUp';
import './App.css';

=======
import {HomePage, UserDashboard, SignUp} from "./pages";
import { AdminDashboard } from "./admin-pages";
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from "./pages/Unauthorized";
>>>>>>> e357808b7992b501e2de7b86061b5352599e5f52

function App() {
  return (
      <div className="App">
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Home Page */}
          <Route path="/user" element={<UserDashboard />} />  {/* Home Page */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
=======
          <Routes>
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
>>>>>>> e357808b7992b501e2de7b86061b5352599e5f52
      </div>
  );
}

export default App;
