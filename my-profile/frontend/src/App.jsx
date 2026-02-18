import { useEffect, useState } from 'react';
import './App.css';

// Use environment variable for the backend URL
// In production (Vercel), use /api/guestbook; locally use localhost:3000
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api/guestbook' : 'http://localhost:3000/guestbook');

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', message: '' });

  const load = async () => {
    const res = await fetch(API_URL);
    setEntries(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', message: '' });
    load();
  };

  const remove = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    load();
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm({ name: entry.name, message: entry.message });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', message: '' });
  };

  const updateEntry = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditingId(null);
    setEditForm({ name: '', message: '' });
    load();
  };

  return (
    <div className="container">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p className="subtitle">Welcome to my personal website!</p>
      </header>

      <section className="guestbook-section">
        <h2>Guestbook</h2>
        <p>Leave a message and say hello!</p>

        <form onSubmit={save} className="guestbook-form">
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button type="submit">Sign Guestbook</button>
        </form>

        <hr />

        <div className="entries">
          {entries && entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id} className="entry">
                {editingId === entry.id ? (
                  <div className="edit-form">
                    <input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                    <textarea
                      value={editForm.message}
                      onChange={(e) =>
                        setEditForm({ ...editForm, message: e.target.value })
                      }
                    />
                    <div className="button-group">
                      <button onClick={() => updateEntry(entry.id)}>Save</button>
                      <button onClick={cancelEdit} className="secondary">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>
                      <strong>{entry.name}</strong>: {entry.message}
                    </p>
                    <div className="button-group">
                      <button onClick={() => startEdit(entry)}>Edit</button>
                      <button onClick={() => remove(entry.id)} className="danger">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="no-entries">No entries yet. Be the first to sign!</p>
          )}
        </div>
      </section>
    </div>
  );
}
