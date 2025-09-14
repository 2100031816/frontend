import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { AuthContext } from '../services/AuthContext';

export default function NotesPage() {
  const { token, user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [limitReached, setLimitReached] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    api.getNotes()
      .then(res => setNotes(res.data))
      .catch(() => setError('Failed to fetch notes'));
  }, [token, navigate]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.createNote(title, content);
      setNotes([...notes, res.data]);
      setTitle('');
      setContent('');
      setLimitReached(false);
    } catch (err) {
      if (err.response && err.response.data.message.includes('Note limit')) {
        setLimitReached(true);
      } else {
        setError('Failed to create note');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
    } catch {
      setError('Failed to delete note');
    }
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <button onClick={logout}>Logout</button>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
        <button type="submit">Add Note</button>
      </form>
      {limitReached && (
        <div className="limit-warning">
          Note limit reached. <button onClick={() => navigate('/upgrade')}>Upgrade to Pro</button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
