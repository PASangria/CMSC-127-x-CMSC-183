// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';


function App() {
  return (
    <Router> {/* Wrap your app in BrowserRouter */}
      <div className="App">
        <h1>Guidance Counselor System</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Home Page */}
          <Route path="/user" element={<UserDashboard />} />  {/* Home Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
