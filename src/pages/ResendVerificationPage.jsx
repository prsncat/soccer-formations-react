import { useState } from 'react';
import { resendVerificationEmail } from '../auth/authApi';

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

async function handleSubmit(event) {
  event.preventDefault();

  setMessage('');
  setError('');
  setBusy(true);

  try {
    const result =
      await resendVerificationEmail(email);

    setMessage(result.message);
  } catch (err) {
    setError(
      err.message || 'Unable to send verification email.'
    );
  } finally {
    setBusy(false);
  }
}

  return (
    <div>
      <h1>Resend Verification Email</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email Address"
          required
        />

<button type="submit" disabled={busy}>
  {busy
    ? 'Sending Verification Email...'
    : 'Send Verification Email'}
</button>

      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}