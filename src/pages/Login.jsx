import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/FakeAuthContext';
import ReactGA from 'react-ga';
import PageNav from '../components/PageNav';
import { useNavigate } from 'react-router';
import Button from '../components/Button';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuthContext();

  useEffect(
    function () {
      if (isAuthenticated) navigate('/app', { replace: true });
    },
    [navigate, isAuthenticated]
  );

  function handleLogin(e) {
    e.preventDefault();
    if (email && password) {
      ReactGA.event({
        category: 'Button',
        action: 'Click',
        label: 'Contact Us',
      });
      login(email, password);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button onClick={handleLogin} type="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
