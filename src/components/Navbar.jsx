import { NavLink } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';

function Navbar() {
  const items = [
    { path: '/', title: 'Home' },
    { path: '/login', title: 'Login' },
    { path: '/logout', title: 'Logout' },
    { path: '/signup', title: 'Signup' },
  ];

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Authx</NavLink>
        <Button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {
              items.map((item, i) => (
                <li key={i} className="nav-item">
                  <NavLink className="nav-link" to={item.path}>{item.title}</NavLink>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Nav>
  );
}

export default Navbar;
