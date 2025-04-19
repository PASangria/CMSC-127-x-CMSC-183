// src/App.js
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
