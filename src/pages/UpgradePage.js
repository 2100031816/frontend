import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { AuthContext } from '../services/AuthContext';

export default function UpgradePage() {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setError('');
    setMessage('');
    try {
      // Extract tenant slug from email (e.g., admin@acme.test => acme)
      const tenantSlug = user.email.split('@')[1].split('.')[0];
      await api.upgrade(tenantSlug);
      setMessage('Upgraded to Pro!');
      setTimeout(() => navigate('/notes'), 1500);
    } catch (err) {
      setError('Upgrade failed');
    }
  };

  return (
    <div className="upgrade-container">
      <h2>Upgrade to Pro</h2>
      <button onClick={logout}>Logout</button>
      <button onClick={handleUpgrade}>Upgrade</button>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
