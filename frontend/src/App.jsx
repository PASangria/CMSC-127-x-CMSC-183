// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import {HomePage, UserDashboard, SignUp} from "./pages";


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Home Page */}
          <Route path="/user" element={<UserDashboard />} />  {/* Home Page */}
          <Route path="/signup" element={<SignUp />} />  {/* Home Page */}
        </Routes>
      </div>
  );
}

export default App;
