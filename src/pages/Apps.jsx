import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import useAuth from '../hooks/useAuth';
import Table from '../components/Table';

const columns = [
  { Header: 'Client ID', accessor: 'id' },
  { Header: 'Secret', accessor: 'secret' },
  { Header: 'Callback URL', accessor: 'callback' },
];

function Apps() {
  const title = 'Applications';

  const { getApps } = useAuth();
  const [apps, setApps] = useState();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const allapps = await getApps();
        if (isMounted) {
          setApps(allapps);
        }
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(`failed to load apps: ${err}`);
      }
    })();

    // Cleanup callback as the component unmounts.
    return () => { isMounted = false; };
  }, [getApps]);

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
            <div className="btn-group me-2">
              <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Create</button>
            </div>
          </div>
        </div>
        <Table columns={columns} data={apps} />
      </div>
    </>
  );
}

export default Apps;
