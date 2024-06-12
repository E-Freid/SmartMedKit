import React, {useCallback} from 'react';
import { validationSchema } from './validationSchema';
import AdminUser from '../../../services/AdminUser';
import { FloatingLabel, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../state/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Layout from "../../../components/Layout";

const AdminLoginPage = () => {
  const [serverError, setServerError] = React.useState(null);
  const { login: setUserLoggedIn, set_user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

 const redirectBackToLastPage = () => {
   const redirectTo = location.state?.from || '/admin';
   navigate(redirectTo);
 }

  const handleFormSubmission = useCallback(async (values, { setSubmitting, setFieldError }) => {
    try {
      const loginResult = await AdminUser.login(values);
      if (loginResult.success === false) {
        throw(loginResult.moreInfo);
      }

      setUserLoggedIn();
      set_user(loginResult.user);
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
  }, []);

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
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={formik.handleSubmit}>
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
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default AdminLoginPage;
