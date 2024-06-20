import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import {ListGroup, Badge, Spinner, Card} from 'react-bootstrap';
import AdminUser from "../../../../services/AdminUser";

const CompartmentList = ({ kitId }) => {
  const [compartments, setCompartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompartments = async () => {
      try {
        setLoading(true);
        const compartmentsList = await AdminUser.getKitCompartmentsList(kitId);
        setCompartments(compartmentsList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCompartments();
  }, [kitId]);

  const getLatestMeasurement = (compartment) => {
    return compartment.measurements.findLast(measure => measure.kit_id === Number(kitId));
  };

  const isActive = (lastMeasurementTime) => {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    return new Date(lastMeasurementTime).getTime() < tenMinutesAgo;
  };

  const getStatus = (lastMeasurement) => {
    if(lastMeasurement.weight < 25)
      return "LOW"

    if(lastMeasurement.weight < 51)
      return "MEDIUM";

    return "HIGH";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'LOW':
        return <Badge bg="danger" className="ms-2">Low</Badge>;
      case 'MEDIUM':
        return <Badge bg="warning" className="ms-2">Medium</Badge>;
      case 'HIGH':
        return <Badge bg="success" className="ms-2">High</Badge>;
      default:
        return <Badge bg="secondary" className="ms-2">Unknown</Badge>;
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
      <Card.Header>Compartments List</Card.Header>
      <Card.Body>
        <ListGroup>
          {compartments.map(compartment => {
              const latestMeasurement = getLatestMeasurement(compartment);
              const status = getStatus(latestMeasurement);

              return (
                <ListGroup.Item key={compartment.compartment_id}>
                  <div>
                    <strong>Compartment {compartment.compartment_id}</strong>
                    {getStatusBadge(status)}
                    {isActive(latestMeasurement.timestamp) ? (
                      <>
                        <FaCheckCircle className="text-success ms-2" />
                        <span className="ms-2 text-success">Active</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="text-danger ms-2" />
                        <span className="ms-2 text-danger">Inactive</span>
                      </>
                    )}
                  </div>
                  <div>Last Weight Measured: {latestMeasurement.weight}g</div>
                </ListGroup.Item>
              );
            }
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CompartmentList;