import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import kitImg from '../../../assets/pngimg.com - first_aid_kit_PNG151.png';

const KitCard = ({ kit }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/kit/${kit.id}`);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-5">
      <Card bg='light' text='dark' className="h-100 cursor-pointer" onClick={handleEditClick}>
        <Card.Img variant="top" src={kitImg} alt={kit.name} />
        <Card.Body>
          <Card.Title>{kit.name}</Card.Title>
          <Card.Text>{kit.location}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default KitCard;