import { Helmet } from 'react-helmet';

import './auth.css';
import logo from './logo.svg';

function Logout() {
  const title = 'Logout';

  return (
    <>
      <Helmet>
        <title>Authx: {title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <form>
          <img className="mb-2 auth-logo" src={logo} alt="React Logo" />
          <h3 className="h3 mb-3 fw-normal">Log me out from all sessions</h3>
          <button className="w-100 btn btn-lg btn-primary" type="button">Log out</button>
        </form>
      </main>
    </>
  );
}

export default Logout;
