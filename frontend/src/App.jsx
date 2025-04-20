import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, UserDashboard, SignUp, SetupProfile } from "./pages";
import { AdminDashboard } from "./admin-pages";
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* HomePage restricted for logged-in users */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <HomePage />
            </PublicOnlyRoute>
          }
        />

        {/* Signup should only be accessible if NOT logged in */}
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignUp />
            </PublicOnlyRoute>
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

        <Route
          path="/setup-profile"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <SetupProfile />
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
