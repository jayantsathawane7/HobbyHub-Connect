import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbarComponent from './AdminNavbarComponent';
import Card from 'react-bootstrap/Card';
import '../CSS/AddGroup.css'
export default function AddGroupComponent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGroup = { name, description };

    try {
      const response = await fetch('http://localhost:8080/groups/addgroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup),
      });

      if (!response.ok) {
        throw new Error('Failed to add group');
      }

      navigate('/grouplist'); // Redirect to Group List page after successful addition
    } catch (error) {
      setError('Failed to add group');
      console.error('Error adding group:', error);
    }
  };

  const handleCancel = () => {
    navigate('/grouplist'); // Navigate to Group List page on cancel
  };

  return (
    <div className='start'>
      <AdminNavbarComponent />
      <div className="container mt-4 form-container">
        <Card style={{ width: '30rem', marginTop: '90px', padding: '20px' }} className="mx-auto">
          <Card.Body>
            <Card.Title style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '28px' }}>Add New Group</Card.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fname" className="form-label label-left">Group Name</label>
                <input
                  type="text"
                  className={`form-control ${error && 'is-invalid'}`}
                  id="fname"
                  name="fname"
                  placeholder="Enter group name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength="2"
                  maxLength="50"
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label label-left">Description</label>
                <input
                  type="text"
                  className={`form-control ${error && 'is-invalid'}`}
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  minLength="2"
                  maxLength="100"
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="d-flex">
                <Button type="submit" className="btn btn-primary">Save</Button>
                <Button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
