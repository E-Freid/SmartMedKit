import React, { useEffect, useState } from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import AdminUser from "../../../../services/AdminUser";

const Notifications = ({ kitId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try{
        const kit = await AdminUser.getKitById(kitId);
        setNotifications(kit.notifications);
      } catch (e) {
       console.error(e);
      }
    };

    getNotifications();
  }, [kitId]);

  if(notifications.length === 0)
    return null;

  return (
    <Card>
      <Card.Body>
        <ListGroup>
          {notifications.map(notification => (
            <ListGroup.Item key={notification.id}>
              {notification.message} - {new Date(notification.timestamp).toLocaleString()}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Notifications;