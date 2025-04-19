// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import {HomePage, UserDashboard, SignUp} from "./pages";
import { AdminDashboard } from "./admin-pages";
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
      <div className="App">
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
      </div>
  );
}

export default App;
