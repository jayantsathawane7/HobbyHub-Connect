import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Notification.css';
import UserNavbarComponent from './UserNavbarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  invitation: faUser,
};

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/notifications/latest');
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div class="start">
    <UserNavbarComponent />
    {/* <div className="notification-container"> */}
      <h2 className="text-center">My Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className="card notification-card invitation">
          {/* <div className="card-body"> */}
            <table>
              <tbody>
                <tr>
                  <td style={{ width: '10%' }}>
                    <FontAwesomeIcon
                      icon={iconMap[notification.type]}
                      className="notification-icon"
                    />
                  </td>
                  <td style={{ width: '80%' }}>
                    <div className="card-title">{notification.message}</div>
                  </td>
                  <td style={{ width: '10%' }}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="mark-as-read"
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as Read"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      ))}
    </div>
  );
};

export default NotificationComponent;
