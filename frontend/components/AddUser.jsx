// src/components/AddStudent.js
import React, { useState } from 'react';
import api from '../src/api';

const AddUser = () => {
  const [userData, setUsertData] = useState({
    first_name: '',
    last_name: '',
    student_id: '',
    email: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('users/', userData);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="student_id"
          value={userData.user_id}
          onChange={handleChange}
          placeholder="User ID"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
