import { Helmet } from 'react-helmet';
import { Image } from 'react-bootstrap';

import './profile.css';
import userIcon from '../common/user.svg';

function Logout() {
  const title = 'Profile';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <Image src={userIcon}
               className="my-4 avatar-icon"
               alt="avatar" />
        <h3 className="h3 mb-3 fw-normal">Administrator</h3>
      </main>
    </>
  );
}

export default Logout;
