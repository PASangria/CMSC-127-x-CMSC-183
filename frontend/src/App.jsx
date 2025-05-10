import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, SignUp, VerifiedPage, FormPublicPage, FAQPublicPage } from "./pages";
import LoginPage from "./pages/LoginPage";
import { AdminDashboard, AdminBIS, AdminSCIF, AdminReferral, AdminStudentList, AdminSystemSettings, AdminReports } from "./admin-pages";
import { UserDashboard, SetUpProfile, UserPrivacySetting, UserSubmittedForms, UserProfile } from "./student-pages";
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Unauthorized from "./pages/Unauthorized";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BISForms from "./components/BISForms";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />
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

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
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

        <Route path="/verify/:uid/:token" element={<VerifiedPage />} />

        {/* User dashboard, block access for admins */}
        <Route
          path="/student"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup-profile"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <SetUpProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/basic"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <BISForms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submitted-forms"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <UserSubmittedForms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-setting"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <UserPrivacySetting />
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
        <Route
          path="/admin-student-list"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminStudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-bis-list"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminBIS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-scif-list"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminSCIF />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-referral-list"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminReferral />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-reports"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-system-settings"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminSystemSettings />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unauthorized access */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/public-forms" element={<FormPublicPage />} />
        <Route path="/faq" element={<FAQPublicPage />} />
      </Routes>
    </div>
  );
}

export default App;
