import React from 'react';
import { validationSchema } from './validationSchema';
import AdminUser from '../../../services/AdminUser';
import { FloatingLabel, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../../state/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Layout from "../../../components/Layout";
import ResponsiveForm from "../../../components/common/ResponsiveForm";

const AdminLoginPage = () => {
  const [serverError, setServerError] = React.useState(null);
  const { login: setUserLoggedIn, set_user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

 const redirectBackToLastPage = () => {
   const redirectTo = location.state?.from || '/admin';
   navigate(redirectTo);
 };

  const handleFormSubmission = async (values, { setSubmitting, setFieldError }) => {
    try {
      const loggedInUser = await AdminUser.login(values);
      setUserLoggedIn();
      set_user(loggedInUser);
      setServerError(null);
      redirectBackToLastPage();
    } catch (ex) {
      if (ex.errors) {
        for (const key in ex.errors) {
          if(values[key]) {
            setFieldError(key, ex.errors[key]);
          }
        }
      } else {
        setServerError(ex.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleFormSubmission
  });

  return (
    <Layout noMenu>
      <h2>Login</h2>
      <ResponsiveForm onSubmit={formik.handleSubmit}>
        {serverError && <Alert variant="danger">{serverError}</Alert>}
        <FloatingLabel controlId="email" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...formik.getFieldProps('email')}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          ) : null}
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            {...formik.getFieldProps('password')}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          ) : null}
        </FloatingLabel>
        <Button type="submit" disabled={formik.isSubmitting} className="w-100">
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </ResponsiveForm>
    </Layout>
  );
};

export default AdminLoginPage;
