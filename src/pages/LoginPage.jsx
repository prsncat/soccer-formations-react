import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);

    try {
      await login(form.email, form.password);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Unable to log in.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <p className="auth-subtitle">
          Access your soccer formations dashboard.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={updateField}
            required
          />
        </label>

        <button className="auth-button" disabled={busy}>
          {busy ? 'Logging in...' : 'Log In'}
        </button>

<p className="auth-footer">
  Need an account? <Link to="/signup">Create one</Link>
</p>

<p className="auth-footer">
  <Link to="/resend-verification">
    Need a new verification email?
  </Link>
</p>

      </form>
    </main>
  );
}