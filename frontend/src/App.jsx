import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import { HomePage, SignUp, VerifiedPage, FormPublicPage, FAQPublicPage, ChangePassword } from "./pages";
import { AdminDashboard, AdminSCIFList, AdminReferral, AdminStudentList, AdminSystemSettings, AdminReports, AdminBISList, AdminSCIFView, AdminBISView } from "./admin-pages";
import { UserDashboard, UserPrivacySetting, UserSubmittedForms, UserProfile } from "./student-pages";
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Unauthorized from "./pages/Unauthorized";
import { MoreVertical } from "react-feather";
import Test from "./App";
import { ResetPassword } from "./pages/ResetPassword";
import { ForgotPassword } from "./pages/ForgotPassword";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MultiStepForm from "./forms/SetupProfile/SetupProfile";
import BISForm from "./forms/BIS/BIS";
import SCIF from "./forms/SCIF/SCIF";
import { AdminStudentView } from "./admin-pages/AdminStudentView";
import BISProfilePage from "./student-pages/BISProfilePage";
import SCIFProfilePage from "./student-pages/SCIFProfilePage";



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
              <MultiStepForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/basic-information-sheet"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <BISForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submitted-forms/basic-information-sheet"
          element={
            <ProtectedRoute requireAdmin={false}>
              <BISProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/student-cumulative-information-file"
          element={
            <ProtectedRoute requireAdmin={false} requireUser={true}>
              <SCIF/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submitted-forms/student-cumulative-information-file"
          element={
            <ProtectedRoute requireAdmin={false}>
              <SCIFProfilePage />
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
              <ChangePassword />
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
          path="/admin/students/:studentId"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminStudentView  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/student-forms/:studentId/student-cumulative-information-file"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminSCIFView  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-bis-list"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminBISList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/student-forms/:studentId/basic-information-sheet"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminBISView  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-scif-list"
          element={
            <ProtectedRoute requireAdmin={true} requireUser={false}>
              <AdminSCIFList />
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
              <ChangePassword />
            </ProtectedRoute>
          }
        />


        {/* Fallback for unauthorized access */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/public-forms" element={<FormPublicPage />} />
        <Route path="/faq" element={<FAQPublicPage />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
