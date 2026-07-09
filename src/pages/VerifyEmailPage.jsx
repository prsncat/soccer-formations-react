import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../auth/authApi.js';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying your email...');
  const [error, setError] = useState('');

  useEffect(() => {
    async function runVerification() {
      const token = searchParams.get('token');

      if (!token) {
        setError('Missing verification token.');
        return;
      }

      try {
        await verifyEmail(token);
        setStatus('Email verified successfully. You can now log in.');
      } catch (err) {
        setError(err.message || 'Email verification failed.');
      }
    }

    runVerification();
  }, [searchParams]);

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Email Verification</h1>

        {error ? (
          <div className="auth-error">{error}</div>
        ) : (
          <div className="auth-success">{status}</div>
        )}

        <p className="auth-footer">
          <Link to="/login">Go to login</Link>
        </p>
      </div>
    </main>
  );
}