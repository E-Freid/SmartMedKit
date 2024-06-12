import React from 'react';
import {NavLink} from 'react-router-dom';
import AdminUser from '../../../services/AdminUser';
import { useParams } from "react-router-dom";
import {Alert, Button, FloatingLabel, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {validationSchema} from "./validationSchema";

import Layout from "../../../components/Layout";
import ResponsiveForm from "../../../components/common/ResponsiveForm";
import {useAuth} from "../../../state/AuthContext";

const AddKitPage = () => {
  const { kitId } = useParams();
  const { user } = useAuth();
  const [serverError, setServerError] = React.useState(null);
  const [isSucceed, setSucceed] = React.useState(false);

  const handleFormSubmission = async (values, { setSubmitting }) => {
    try {
      await AdminUser.addKit(user.id, values.kitId);
      setSucceed(true);
      setServerError(null);
    } catch (e) {
      setSucceed(false);
      setServerError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      kitId: kitId || '',
      kitName: ''
    },
    validationSchema,
    onSubmit: handleFormSubmission
  });

  return (
    <Layout>
      <h2>Add New Kit</h2>
      <ResponsiveForm onSubmit={formik.handleSubmit}>
        {serverError && <Alert variant="danger">{serverError}</Alert>}
        {isSucceed && (
          <Alert key='success' variant='success'>
            The kit was added successfully.{' '}
            <NavLink to="/admin/kits">Go to see your kits</NavLink>
          </Alert>
        )}
        <FloatingLabel controlId="kitId" label="Kit ID" className="mb-3">
          <Form.Control
            type="text"
            {...formik.getFieldProps('kitId')}
            isInvalid={formik.touched.kitId && formik.errors.kitId}
          />
          {formik.touched.kitId && formik.errors.kitId ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.kitId}
            </Form.Control.Feedback>
          ) : null}
        </FloatingLabel>
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Adding...' : 'Add Kit'}
        </Button>
      </ResponsiveForm>
    </Layout>
  );
};

export default AddKitPage;