import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/FakeAuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/');
    },
    [isAuthenticated, navigate]
  );

  if (!isAuthenticated) return null;

  return children;
}

export default ProtectedRoute;
