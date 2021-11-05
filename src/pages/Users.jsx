import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Table from '../components/Table';
import useAuth from '../hooks/useAuth';
import Jdenticon from '../components/Jdenticon';
import CreateUserDialog from '../components/CreateUserDialog';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Username', accessor: 'username' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Firstname', accessor: 'firstname' },
  { Header: 'Lastname', accessor: 'lastname' },
];

const addHeader = () => <th colSpan="1" role="columnheader">Avatar</th>;

const addCell = (row) => (
  <td role="cell">
    <Jdenticon name={row.cells[1].value} height="32px" width="32px" />
  </td>
);

function Users() {
  const title = 'Users';

  const { getUsers } = useAuth();
  const [users, setUsers] = useState();
  const [isShow, setIsShow] = useState(false);

  // TODO: Need an easier way to load the table.
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const allusers = await getUsers();
        if (isMounted) {
          setUsers(allusers);
        }
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(`failed to load users: ${err}`);
      }
    })();

    // Cleanup callback as the component unmounts.
    return () => { isMounted = false; };
  }, [getUsers]);

  const handleShow = () => {
    setIsShow(true);
  };

  const handleCreate = async (data) => {
    setIsShow(false);
    // eslint-disable-next-line no-console
    console.log('signup successful, user:', data);

    const allusers = await getUsers();
    setUsers(allusers);
  };

  const handleCancel = () => {
    setIsShow(false);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container-fluid">
        <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{title}</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button type="button" className="btn btn-sm btn-outline-secondary me-3" onClick={handleShow}>Create
            </button>
            <div className="btn-group me-2">
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Remove</button>
            </div>
          </div>
        </div>
        <Table columns={columns} data={users} addHeader={addHeader} addCell={addCell} />
      </div>
      <CreateUserDialog show={isShow} onCreate={handleCreate} onCancel={handleCancel} />
    </>
  );
}

export default Users;
