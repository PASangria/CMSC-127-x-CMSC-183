// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, UserDashboard, SignUp } from "./pages";
import { AdminDashboard } from "./admin-pages";
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from "./pages/Unauthorized";


function App() {
  return (
      <div className="App">
        <Routes>

          {/* Public route */}
          <Route path="/" element={<HomePage />} />

          {/* Signup should only be accessible if NOT logged in */}
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireAuth={true}>
                <SignUp />
              </ProtectedRoute>
            }
          />

          {/* User dashboard, block access for admins */}
          <Route
            path="/user"
            element={
              <ProtectedRoute requireAdmin={false} requireUser={true}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin dashboard only accessible by superusers */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true} requireUser={false}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback for unauthorized access */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
  );
}

export default App;
