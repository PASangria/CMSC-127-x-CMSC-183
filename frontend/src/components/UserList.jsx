// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('users/');
        setUsers(response.data); 
      } catch (error) {
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>  
      ) : (
        <ul>
          {users.map((user) => (
          <li key={user.user_id}>
            {user.up_mail}
          </li>
        ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
