import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserNavbarComponent from './UserNavbarComponent';
import '../CSS/HobbyList.css'; // Make sure to create this CSS file for styling

export default function HobbyListComponent() {
  const [hobbies, setHobbies] = useState([]);
  const [error, setError] = useState('');

  // Retrieve loginId from localStorage
  const loginId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchHobbies = async () => {
      if (!loginId) {
        setError('No loginId found in storage.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/hobbies/gethobbiesbyuser/${loginId}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch hobbies');
        }
        const data = await response.json();
        setHobbies(data);
      } catch (error) {
        setError('Failed to load hobbies');
        console.error('Error fetching hobbies:', error);
      }
    };

    fetchHobbies();
  }, [loginId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hobby?')) {
      try {
        const response = await fetch(`http://localhost:8080/hobbies/deletehobby/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete hobby');
        }
        setHobbies(hobbies.filter(hobby => hobby.id !== id)); // Corrected to hobby.id
      } catch (error) {
        setError('Failed to delete hobby');
        console.error('Error deleting hobby:', error);
      }
    }
  };

  return (
    <div className='start'>
      <UserNavbarComponent />
      <div className='container mt-4'>
        <h1>Hobby List</h1>
        {error && <p className='text-danger'>{error}</p>}
        <Link to="/addhobby">
          <Button variant="primary" className='mb-3'>Add New Hobby</Button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hobbies.map(hobby => (
              <tr key={hobby.id}>
                <td>{hobby.name}</td>
                <td>{hobby.description}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(hobby.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
