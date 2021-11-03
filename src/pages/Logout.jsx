import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

import { logout } from '../services/MockAuthService';

import './login.css';

function Logout() {
  const title = 'Logout';

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    await logout();
    setIsLoading(false);
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <form>
          <i className="bi bi-file-lock-fill auth-icon my-4"/>
          <p className="mb-3 fw-normal">Click <strong>Log out</strong> button to log out and navigate back to home.</p>
          <Button className="w-100 btn btn-lg btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleLogout}
          >
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoading} />
            <span className="px-2">Log out</span>
          </Button>
        </form>
      </main>
    </>
  );
}

export default Logout;
