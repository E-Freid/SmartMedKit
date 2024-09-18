import React, { useState, useEffect } from "react";
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../../../state/AuthContext';
import AdminUser from '../../../services/AdminUser';

import Layout from "../../../components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: adminData } = useAuth();
  const [kitsData, setKitsData] = useState([]);
  const [totalStats, setTotalStats] = useState({});

  const handleKitDelete = async (kitId) => {
    try {
      if (window.confirm('Are you sure you want to delete this kit?')) {
        await AdminUser.removeKit(adminData.id, kitId);
        setKitsData((prevKits) => prevKits.filter((kit) => kit.id !== kitId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const adminKits = await AdminUser.getAdminKitsList(adminData.id);
      const compartments = await AdminUser.getCompartmentsList();

      compartments.forEach((compartment) => {
        const {kit, compartment_id, measurements} = compartment;

        let existingCompartmentKit = adminKits.find(k => k.id === kit.id);
        if (existingCompartmentKit) {
          // Calculate current weight (default to 0 if no measurements)
          const current_weight = measurements.length > 0
            ? measurements[0].weight // Latest measurement
            : 0;

          const compRef = existingCompartmentKit.compartments.find(comp => comp.id = compartment_id);
          compRef.current_weight = current_weight;
        }
      });

      setKitsData(adminKits);
    }
    fetchData();
  }, [adminData.id]);

  useEffect(() => {
    // Helper function to calculate total stats
    const calculateDashboardStats = (adminData) => {
      const totalKits = adminData.kits.length;
      const totalCompartments = kitsData.filter(kit => kit.admins.some(admin => adminData.id === admin.id))
        .reduce((sum, kit) => sum + kit.compartments.length, 0);

      return { totalKits, totalCompartments };
    };

    if (adminData && kitsData.length) {
      const stats = calculateDashboardStats(adminData);
      setTotalStats(stats);
    }
  }, [adminData, kitsData]);

  const stackedBarData = {
    labels: kitsData.map(kit => kit.name),
    datasets: [
      {
        label: 'Low Inventory',
        data: kitsData.map(kit => kit.compartments.filter(c => c.current_weight < c.max_weight * 0.2).length),
        backgroundColor: '#FF6384',
      },
      {
        label: 'Medium Inventory',
        data: kitsData.map(kit => kit.compartments.filter(c => c.current_weight >= c.max_weight * 0.2 && c.current_weight < c.max_weight * 0.8).length),
        backgroundColor: '#FFCE56',
      },
      {
        label: 'High Inventory',
        data: kitsData.map(kit => kit.compartments.filter(c => c.current_weight >= c.max_weight * 0.8).length),
        backgroundColor: '#36A2EB',
      }
    ]
  };

  const stackedBarOptions = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    }
  };

  return (
    <Layout>
      <h2 className="mb-5">Dashboard</h2>
      {/* Overview Stats */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Kits</Card.Title>
              <Card.Text>{totalStats.totalKits}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Compartments</Card.Title>
              <Card.Text>{totalStats.totalCompartments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Kit Summary Table */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Kit Summary</Card.Title>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Kit Name</th>
              <th>Location</th>
              <th>Compartments</th>
              <th>Last Measurement</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {kitsData.map((kit) => (
              <tr key={kit.id}>
                <td>{kit.name}</td>
                <td>{kit.location}</td>
                <td>{kit.compartments.length}</td>
                <td>{kit.measurements.length ? new Date(kit.measurements[0].timestamp * 1000).toLocaleString() : 'N/A'}</td>
                <td>
                  <Button variant="primary" onClick={() => navigate(`/admin/kit/${kit.id}`)}>View</Button>{' '}
                  <Button variant="danger" onClick={() => handleKitDelete(kit.id)}>Delete</Button>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Compartment Chart */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Compartment status across kits</Card.Title>
          <Bar data={stackedBarData} options={stackedBarOptions } />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Dashboard;