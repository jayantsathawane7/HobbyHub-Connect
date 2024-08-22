import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AdminNavbarComponent from "./AdminNavbarComponent";
import '../CSS/UserListComponent.css'; 
export default function UserListComponent() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/registration/getallusers');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Failed to load users');
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='start'>
        <AdminNavbarComponent />
      <h1>User List</h1>
      {error && <p className="text-danger">{error}</p>}
      <Table bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td> 
              <td>{`${user.fname} ${user.lname}`}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
