import React, {useEffect, useState} from 'react';
import {Button, Card, Spinner} from "react-bootstrap";
import EditKitModal from "../EditKitModal";
import AdminUser from "../../../../services/AdminUser";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../../state/AuthContext";

const KitDetails = ({ kitId }) => {
  const [kit, setKit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const getKitDetails = async () => {
      try {
        const kitDetails = await AdminUser.getKitById(kitId);
        setKit(kitDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getKitDetails();
  }, [kitId]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleKitDelete = async () => {
    try {
      if (window.confirm('Are you sure you want to delete this kit?')) {
        await AdminUser.removeKit(user.id, kitId);
        navigate('/admin/kits')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (editKitPayload) => {
    try {
      const updatedKit = await AdminUser.editKit(kitId, editKitPayload);
      setKit(updatedKit);
    } catch (error) {
      console.error(error);
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
    <Card className="mb-3 h-100">
      <Card.Header>Kit Details</Card.Header>
      <Card.Body>
        <Card.Title>{kit.name}</Card.Title>
        <Card.Text>
          Location: {kit.location}
        </Card.Text>
        <Button className="me-2" variant="primary" onClick={handleModalShow}>Edit Kit</Button>
        <Button variant="danger" onClick={handleKitDelete}>Delete Kit</Button>
        <EditKitModal
          showModal={showModal}
          kitData={kit}
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
        />
      </Card.Body>
    </Card>
  );
};

export default KitDetails;