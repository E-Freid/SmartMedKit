import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../state/AuthContext";
import {Button, Row, Col, Alert, Spinner} from 'react-bootstrap';
import AdminUser from "../../../services/AdminUser";

import Layout from "../../../components/Layout";
import EditKitModal from "./EditKitModal";

const KitPage = () => {
  const [kitData, setKitData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { kitId} = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getKitDetails = async () => {
    try {
      const kitDetails = await AdminUser.getKitById(kitId);
      setKitData(kitDetails);
    } catch (error) {
      setError('Failed to fetch kit details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKitDetails();
  }, [kitId]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleKitDelete = async () => {
    try {
      await AdminUser.removeKit(user.id, kitId);
      navigate('/admin/kits')
    } catch (e) {
      setError('Failed to delete kit');
    }
  };

  const handleSubmit = async (editKitPayload) => {
    try {
      await AdminUser.editKit(kitId, editKitPayload)
    } catch (error) {
      setError('Failed to update kit');
    } finally {
      setShowModal(false);
    }
  };

  if(loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Layout>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="mb-5">Kit Page</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" className="me-2" onClick={handleModalShow}>
            Edit Kit
          </Button>
          <Button variant="danger" onClick={handleKitDelete}>
            Delete Kit
          </Button>

          <EditKitModal
            showModal={showModal}
            kitData={kitData}
            handleModalClose={handleModalClose}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default KitPage;