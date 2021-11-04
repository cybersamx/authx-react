import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Button, Col, Form, FormControl, FormLabel, Row, Spinner,
} from 'react-bootstrap';

import useAuth from '../hooks/useAuth';

import './login.css';

function redirectPath(search) {
  const match = search.match(/redirect=(.*)/);
  const redirect = match?.[1];
  return redirect ? decodeURIComponent(redirect) : '/console';
}

function Login() {
  const title = 'Login';

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const token = await login(data.username, data.password);
      // eslint-disable-next-line no-console
      console.log(`login successful, token: ${token}`);
      setIsLoading(false);
      navigate(redirectPath(search));
    } catch (err) {
      setIsLoading(false);
      // eslint-disable-next-line no-alert
      alert(`login failed: ${err}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <Form noValidate>
          <i className="bi bi-file-lock-fill auth-icon my-4"/>
          <p className="mb-3 fw-normal">
            Click <strong>Log in</strong> button to log into the admin console.
            Use <strong>admin</strong>:<strong>qwerty</strong> to log in.
          </p>
          <Form.Group className="form-floating" controlId="inputUsername">
            <FormControl type="text"
                         className="form-control form-input-top"
                         isInvalid={errors.username}
                         placeholder="Username"
                         {...register('username', { required: true })}
            />
            <FormLabel>Username</FormLabel>
          </Form.Group>
          <Form.Group className="form-floating" controlId="inputPassword">
            <FormControl type="password"
                         className="form-control form-input-bottom"
                         isInvalid={errors.password}
                         placeholder="Password"
                         {...register('password', { required: true })}
            />
            <FormLabel>Password</FormLabel>
          </Form.Group>
          <div>
            <div className="text-danger">{errors.username && 'Username is required'}</div>
            <div className="text-danger">{errors.password && 'Password is required'}</div>
          </div>
          <Form.Group as={Row} className="my-3" controlId="isRemember">
            <Col sm={{ span: 8, offset: 3 }} className="text-md-start">
              <Form.Check label="Remember me" {...register('isRemember')} />
            </Col>
          </Form.Group>
          <Button className="w-100 btn btn-lg btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit(handleLogin)}
          >
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoading} />
            <span className="px-2">Log in</span>
          </Button>
        </Form>
      </main>
    </>
  );
}

export default Login;
