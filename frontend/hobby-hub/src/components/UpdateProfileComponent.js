import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import Card from 'react-bootstrap/Card';
import '../CSS/Style.css';
import UserNavbarComponent from './UserNavbarComponent'
import '../CSS/UpdateProfile.css'
export default function UpdateProfileComponent() {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    contact: '',
  });
  const [updatedUser, setUpdatedUser] = useState({
    fname: '',
    lname: '',
    email: '',
    contact: '',
  });
  const navigate = useNavigate(); // Use navigate instead of history

  const handleCancelClick = () => {
    navigate('/profile');
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
          setUpdatedUser(data[0]); // Initialize the updatedUser state
        } else if (data && typeof data === 'object') {
          setUser(data); // Handle case where the response is a single object
          setUpdatedUser(data); // Initialize the updatedUser state
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const buttonStyle = {
    fontFamily: 'Georgia, serif',
    padding: '10px 20px' 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginId = localStorage.getItem('user_id'); // Retrieve loginId from localStorage

    fetch(`http://localhost:8080/registration/updateprofile/${loginId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Profile updated successfully:', data);
        navigate('/profile'); // Redirect to profile page after successful update
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div className="start">
    <UserNavbarComponent></UserNavbarComponent>
  
    <div className="container mt-4 form-container">
      <Card style={{ width: '30rem', marginTop:'90px', padding:'20px' }} className="mx-auto">
        <Card.Body>
          <Card.Title style={{fontWeight:'bold', marginBottom:'20px', fontSize:'28px'}}>Update Profile</Card.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fname" className="form-label label-left">First Name</label>
              <input
                type="text"
                className="form-control"
                id="fname"
                name="fname"
                value={updatedUser.fname}
                onChange={handleInputChange}
                required
                minLength="2"
                maxLength="50"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lname" className="form-label label-left">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lname"
                name="lname"
                value={updatedUser.lname}
                onChange={handleInputChange}
                required
                minLength="2"
                maxLength="50"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label label-left">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label label-left">Contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                value={updatedUser.contact}
                onChange={handleInputChange}
                required
                pattern="\d{10}"  /* Example for a 10-digit phone number */
              />
            </div>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary" style={buttonStyle}>
                 Save
                </button>
                <button type="submit" className="btn btn-outline-primary" onClick={handleCancelClick}  style={buttonStyle}>
                 Cancel
                </button>
              </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  </div>
  
  );
}
