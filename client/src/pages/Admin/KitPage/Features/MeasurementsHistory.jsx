import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {Card} from "react-bootstrap";
import AdminUser from "../../../../services/AdminUser";

const MeasurementHistory = ({ kitId }) => {
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const getMeasurements = async () => {
      try {
        const measurements = await AdminUser.getKitMeasurements(kitId);
        setMeasurements(measurements);
      } catch (e) {
        console.error(e);
      }
    };

    getMeasurements();
  }, [kitId]);

  const compartments = [...new Set(measurements.map(m => m.compartment_id))];

  const data = {
    labels: [...new Set(measurements.map(m => new Date(m.timestamp).toLocaleString()))],
    datasets: compartments.map(compartment_id => ({
      label: `Compartment ${compartment_id}`,
      data: measurements.filter(m => m.compartment_id === compartment_id).map(m => m.weight),
      fill: false,
      backgroundColor: `hsl(${compartment_id * 50}, 70%, 50%)`,
      borderColor: `hsl(${compartment_id * 50}, 70%, 50%)`,
    })),
  };

  return (
    <Card className="mb-3">
      <Card.Header>Measurement History</Card.Header>
      <Card.Body>
        <Line data={data} />
      </Card.Body>
    </Card>
  );
};

export default MeasurementHistory;