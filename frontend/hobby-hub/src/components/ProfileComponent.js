import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../CSS/Style.css'; 
import UserNavbarComponent from './UserNavbarComponent';
import { FaEdit, FaUser, FaEnvelope, FaPhone, FaUsers } from 'react-icons/fa';
import '../CSS/UpdateProfile.css'
import '../CSS/ProfileStyle.css'
import { useNavigate } from 'react-router-dom';

export default function ProfileComponent() {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    contact: '',
  });
  
  const [userGroups, setUserGroups] = useState([]);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/update');
  };

  useEffect(() => {
    const loginId = localStorage.getItem('user_id'); // Retrieve loginId from localStorage
    if (!loginId) {
      console.error("No loginId found in storage.");
      return;
    }

    // Fetch user profile
    fetch(`http://localhost:8080/registration/profile/${loginId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched user data:', data);
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[0]); // Assuming the response is an array with user object
        } else if (data && typeof data === 'object') {
          setUser(data); // Handle case where the response is a single object
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });

    // Fetch user groups
    fetch(`http://localhost:8080/groups/user/${loginId}/groups`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched user groups:', data);
        setUserGroups(data); // Assuming the response is an array of groups
      })
      .catch(error => {
        console.error('Error fetching user groups:', error);
      });
  }, []);

  return (
    <div className="start">
    <UserNavbarComponent></UserNavbarComponent>
  
    <div className="container mt-4 form-container">
      <Card style={{ width: '30rem', marginTop:'90px', padding:'25px' }} className="mx-auto">
        <Card.Body>
          <Card.Title style={{fontWeight:'bold', marginBottom:'20px', fontSize:'28px'}}>Profile</Card.Title>
          <FaEdit className="edit-icon" onClick={handleEditClick} /> {/* Edit icon added */}

          <div className="profile-info">
  <FaUser className="profile-icon" />
  <Card.Text className="profile-text">
    <strong>Name:</strong> {user.fname} {user.lname}
  </Card.Text>
</div>
<div className="profile-info">
           <FaEnvelope className="profile-icon" />
            <Card.Text className="profile-text">
              <strong>Email ID:</strong> {user.email}
             </Card.Text>
           </div>
           <div className="profile-info">
             <FaPhone className="profile-icon" />
             <Card.Text className="profile-text">
               <strong>Contact:</strong> {user.contact}
             </Card.Text>
           </div>
           <div className="profile-info">
  <FaUsers className="profile-icon" />
  <Card.Text className="profile-text">
    <strong>Groups Joined:</strong>
  </Card.Text>
</div>
<ul className="group-list">
      {userGroups.length > 0 ? (
        userGroups.map(group => (
          <li key={group.group_id} className="group-item">
            {group.name}
          </li>
        ))
      ) : (
        <li>No groups joined yet.</li>
      )}
    </ul>

        </Card.Body>
      </Card>
    </div>
  </div>
  );
}
