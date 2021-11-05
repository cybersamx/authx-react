import { useEffect, useRef, useState } from 'react';
import {
  Button, Col, Form, FormControl, FormLabel, InputGroup, Modal, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { emailPattern, namePattern } from '../common/constants';
import useAuth from '../hooks/useAuth';

import './dialog.css';
import StatusAlert from './StatusAlert';

function CreateUserDialog({ show, onCreate, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addUser } = useAuth();
  const [isShow, setIsShow] = useState();
  const alertOpts = useRef({ isShow: false, variant: 'success', message: '' });

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();

  const handleDismiss = () => {
    alertOpts.current.isShow = false;
  };

  const handleCancel = () => {
    reset();

    setIsShow(false);
    onCancel && onCancel();
  };

  const handleCreate = async (data) => {
    setIsLoading(false);

    if (data) {
      try {
        const user = await addUser(data);
        alertOpts.current = { isShow: true, variant: 'success', message: `Added user ${user.username}` };
      } catch (err) {
        alertOpts.current = { isShow: true, variant: 'failure', message: err.message };
        setIsLoading(false);
        return;
      }

      reset();
      setIsLoading(false);
    }

    setIsShow(false);
    onCreate && onCreate(data);
  };

  return (
    <>
      <Modal show={isShow} onHide={handleCancel}>
        <Form noValidate onSubmit={handleSubmit(handleCreate)}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row g-3">
            <Form.Group as={Col} lg="12" controlId="inputFirstName">
              <FormLabel>First Name</FormLabel>
              <FormControl type="text"
                           isInvalid={errors.firstname}
                           placeholder="First Name"
                           {
                             ...register('firstname', {
                               required: true,
                               pattern: namePattern,
                             })
                           }
              />
              <Form.Control.Feedback type="invalid">First name is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} lg="12" controlId="inputLastName">
              <FormLabel>Last Name</FormLabel>
              <FormControl type="text"
                           isInvalid={errors.lastname}
                           placeholder="Last Name"
                           {
                             ...register('lastname', {
                               required: true,
                               pattern: namePattern,
                             })
                           }
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastname?.type === 'required' && 'Last name is required'}
                {errors.lastname?.type === 'pattern' && 'No special characters allowed except hyphen'}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} lg="12" controlId="inputEmail">
              <FormLabel>Email</FormLabel>
              <FormControl type="email"
                           isInvalid={errors.email}
                           placeholder="Email@domain.com"
                           {
                             ...register('email', {
                               required: true,
                               pattern: emailPattern,
                             })
                           }
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.type === 'required' && 'Email is required'}
                {errors.email?.type === 'pattern' && 'Invalid email'}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="inputUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control type="text"
                              isInvalid={errors.username}
                              placeholder="Username"
                              aria-describedby="inputGroupPrepend"
                              {...register('username', { required: true })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username && 'Username is required'}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} lg="12" controlId="inputPassword">
              <FormLabel>Password</FormLabel>
              <FormControl type="password"
                           isInvalid={errors.password}
                           placeholder="Password"
                           {
                             ...register('password', {
                               required: true,
                               minLength: 5,
                             })
                           }
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.type === 'required' && 'Password is required'}
                {errors.password?.type === 'pattern' && 'Password must be at least 5 characters long'}
              </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="w-100 btn btn-lg btn-primary"
                  type="submit"
                  disabled={isLoading}
          >
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoading} />
            <span className="px-2">Create</span>
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
      <StatusAlert show={alertOpts.current.isShow}
                   variant={alertOpts.current.variant}
                   message={alertOpts.current.message}
                   onDismiss={handleDismiss}
      />
    </>
  );
}

export default CreateUserDialog;
