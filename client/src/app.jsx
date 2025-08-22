import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser } from './api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let mounted = true;
    fetchUsers()
      .then(data => {
        if (mounted) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setLoadError(err.message || 'Failed to load users');
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function handleAdd(name) {
    const newUser = await createUser(name);
    setUsers(prev => [newUser, ...prev]); // Virtual DOM update via state
  }

  return (
    <div style={{ maxWidth: 640, margin: '24px auto', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
      <h1>User Management</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : loadError ? (
        <p style={{ color: 'crimson' }}>{loadError}</p>
      ) : (
        <>
          <UserForm onAdd={handleAdd} />
          <h2>Users</h2>
          <UserList users={users} />
        </>
      )}
    </div>
  );
}
