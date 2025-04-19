// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import SignUp from './components/SignUp';
import './App.css';


function App() {
  return (
    <Router> {/* Wrap your app in BrowserRouter */}
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Home Page */}
          <Route path="/user" element={<UserDashboard />} />  {/* Home Page */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
