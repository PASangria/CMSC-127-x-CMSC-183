// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import UserList from '../components/UserList';
import AddUser from '../components/AddUser'; // Import AddUser component

function App() {
  return (
    <Router> {/* Wrap your app in BrowserRouter */}
      <div className="App">
        <h1>Guidance Counselor System</h1>
        <Routes>
          <Route path="/" element={<UserList />} />  {/* Home Page */}
          <Route path="/add" element={<AddUser />} /> {/* Add User Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
