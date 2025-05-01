import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import { HomePage, SignUp, VerifiedPage, FormPublicPage, FAQPublicPage } from "./pages";
import { AdminDashboard, AdminBIS, AdminSCIF, AdminReferral, AdminStudentList, AdminSystemSettings, AdminReports } from "./admin-pages";
import { UserDashboard, SetUpProfile, UserPrivacySetting, UserSubmittedForms, UserProfile } from "./student-pages";
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Unauthorized from "./pages/Unauthorized";
import { MoreVertical } from "react-feather";
import Test from "./App";

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

        <Route path="/verify/:uid/:token" element={<VerifiedPage />} />

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
        <Route path="/test/*" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
