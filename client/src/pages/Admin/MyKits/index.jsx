import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {useAuth} from "../../../state/AuthContext";
import AdminUser from '../../../services/AdminUser';
import {Button, Row} from "react-bootstrap";

import Layout from "../../../components/Layout";
import KitCard from "./KitCard";

const MyKitsPage = () => {
  const { user } = useAuth();
  const [kits, setKits] = useState([]);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const kits = await AdminUser.getRegisteredKits(user.id);
        console.log({kits});
        setKits(kits);
      } catch (e) {
        console.log(e);
      }
    }

    fetchKits();
  }, [user.id]);

  return (
    <Layout>
      <h2 className="mb-5">My Kits</h2>
      <Row className="justify-content-center">
        {Array.isArray(kits) && kits.map(kit => (
              <KitCard key={kit.id} kit={kit} />
          ))}
      </Row>
      <Button as={Link} to="/admin/kits/add" variant="primary" style={{alignSelf: "flex-end"}}>
        Add New Kit
      </Button>
    </Layout>
  );
};

export default MyKitsPage;