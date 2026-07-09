import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../auth/authApi.js';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,15}$/;

function getPasswordScore(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%&*?]/.test(password)) score++;

  return score;
}

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const passwordScore = useMemo(
    () => getPasswordScore(form.password),
    [form.password]
  );

  const passwordIsValid = PASSWORD_REGEX.test(form.password);
  const passwordsMatch = form.password === form.confirmPassword;

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!passwordIsValid) {
      setError(
        'Password must be 8–15 US-English keyboard characters and include at least one uppercase letter, one lowercase letter, one number, and one of ! @ # $ % & * ?.'
      );
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    setBusy(true);

    try {
      await signup({
        email: form.email,
        password: form.password,
      });

      setSuccess(
        'Account created. Please check your email to verify your account.'
      );

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p className="auth-subtitle">
          Sign up to access your soccer formations dashboard.
        </p>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

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
            autoComplete="new-password"
            value={form.password}
            onChange={updateField}
            required
          />
        </label>

        <div className="password-meter">
          <div
            className={`password-meter-fill score-${passwordScore}`}
          />
        </div>

        <ul className="password-rules">
          <li>8–15 standard US-English keyboard characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one of: ! @ # $ % & * ?</li>
        </ul>

        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={updateField}
            required
          />
        </label>

        <button className="auth-button" disabled={busy}>
          {busy ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}