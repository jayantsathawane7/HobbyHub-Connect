import React from 'react';
import AdminNavbarComponent from './AdminNavbarComponent';
import '../CSS/AdminHome.css';

export default function AdminHomeComponent() {
    // Retrieve the admin username from localStorage
    const username = localStorage.getItem('username') || 'Admin'; // Ensure 'username' is the correct key

    return (
        <div>
            <AdminNavbarComponent />
            <div className="admin-home">
                <div className="welcome-container">
                    <h1 className="welcome-message">Welcome, {username}!</h1>
                    <p className="welcome-text">
                        As an admin, you have the power to manage users, oversee groups, and handle events. 
                        Utilize these tools to enhance the community and ensure smooth operations.
                    </p>
                </div>
            </div>
        </div>
    );
}
