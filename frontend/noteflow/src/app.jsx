// App.jsx
import { useState } from 'react';
import Login from './login';
import Register from './register';
import Reset from './reset';
import './style.css';

export default function App() {
  const [page, setPage] = useState('login'); // login, register, reset

  const goTo = (p) => setPage(p);

  return (
    <>
      {page === 'login' && <Login goTo={goTo} />}
      {page === 'register' && <Register goTo={goTo} />}
      {page === 'reset' && <Reset goTo={goTo} />}
    </>
  );
}
