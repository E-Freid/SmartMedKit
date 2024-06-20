import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Layout from "../../../components/Layout";
import KitDetails from "./Features/KitDetails";
import CompartmentsList from "./Features/CompartmentsList";
import MeasurementHistory from "./Features/MeasurementsHistory";
import Notifications from "./Features/NotificationsList";

const KitPage = () => {
  const { kitId} = useParams();

  return (
    <Layout>
      <h2 className="mb-5">Kit Page</h2>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <KitDetails kitId={kitId} />
        </Col>
        <Col xs={12} md={6}>
          <CompartmentsList kitId={kitId} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {/*<CompartmentWeights kitId={kitId} />*/}
          <MeasurementHistory kitId={kitId} />
        </Col>
        <Col md={12}>
          <Notifications kitId={kitId} />
        </Col>
      </Row>
    </Layout>
  );
};

export default KitPage;