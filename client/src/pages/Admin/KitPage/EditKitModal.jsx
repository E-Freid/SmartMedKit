import React, {useEffect, useState} from "react";
import {Form, Modal, Button, FloatingLabel} from "react-bootstrap";
import { kitEditValidationSchema } from "./kitEditValidationSchema";
import { useFormik } from 'formik';

const EditKitModal = ({ showModal, kitData, handleModalClose, handleSubmit }) => {
  const [initialValues, setInitialValues] = useState({ name: '', location: '' });

  useEffect(() => {
    setInitialValues({ name: kitData.name, location: kitData.location });
  }, [kitData]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: kitEditValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleCancel = () => formik.resetForm();

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Kit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="formName" label="Name" className="mb-3">
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            ) : null}
          </FloatingLabel>

          <FloatingLabel controlId="formLocation" label="Location" className="mb-3">
            <Form.Control
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.location && formik.errors.location}
            />
            {formik.touched.location && formik.errors.location ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.location}
              </Form.Control.Feedback>
            ) : null}
          </FloatingLabel>
          <Button variant="primary" type="submit" className="me-2">
            Save
          </Button>
          <Button variant="secondary" type="button" onClick={handleCancel} className="me-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditKitModal;