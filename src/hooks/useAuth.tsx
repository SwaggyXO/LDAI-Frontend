import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [authChecked, setAuthChecked] = useState(false);
  const [intendedPath, setIntendedPath] = useState('');

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Store intended path if user is not authenticated
        const currentPath = window.location.pathname;
        setIntendedPath(currentPath);
        loginWithRedirect();
      }
      setAuthChecked(true);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return { authChecked, intendedPath };
};

export default useAuth;