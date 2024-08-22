
import React from 'react';
import UserNavbarComponent from './UserNavbarComponent';
import '../CSS/UserHome.css';

export default function UserHomeComponent() {
  // Retrieve the username from localStorage
  const username = localStorage.getItem('username') || 'User'; // Ensure 'username' is the correct key

  return (
    <div>
      <UserNavbarComponent />
      <div className="user-home">
        <div className="welcome-container">
          <h1 className="welcome-message">Welcome, {username}!</h1>
          <p className="welcome-text">
            We are glad to have you here. Dive into your hobbies, explore new interests, 
            and connect with like-minded people. Start your journey now!
          </p>
        </div>
      </div>
    </div>
  );
}
