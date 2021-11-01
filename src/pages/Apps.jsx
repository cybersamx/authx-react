import { Helmet } from 'react-helmet';

function Apps() {
  const title = 'Applications';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-fluid">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">{title}</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              {title}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Apps;
