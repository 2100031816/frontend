import React, { useState, useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import { api } from '../services/api';

export default function InvitePage() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.invite(email, role);
      setMessage('User invited!');
      setEmail('');
      setRole('Member');
    } catch (err) {
      setError('Invite failed');
    }
  };

  if (!user || user.role !== 'Admin') {
    return <div>Forbidden</div>;
  }

  return (
    <div className="invite-container">
      <h2>Invite User</h2>
      <form onSubmit={handleInvite}>
        <input type="email" placeholder="User Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Invite</button>
      </form>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
