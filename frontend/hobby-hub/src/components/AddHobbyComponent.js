// import { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import UserNavbarComponent from './UserNavbarComponent';
// import Card from 'react-bootstrap/Card';
// import '../CSS/AddHobby.css';

// export default function AddHobbyComponent() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Retrieve userId from localStorage
//   const userId = localStorage.getItem('user_id');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!userId) {
//       setError('User ID is missing');
//       return;
//     }

//     const newHobby = { name, description, userId };

//     try {
//       const response = await fetch('http://localhost:8080/hobbies/addhobby', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newHobby),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add hobby');
//       }

//       navigate('/hobbylist'); // Redirect to Hobby List page after successful addition
//     } catch (error) {
//       setError('Failed to add hobby');
//       console.error('Error adding hobby:', error);
//     }
//   };

//   const handleCancel = () => {
//     navigate('/hobbylist'); // Navigate to Hobby List page on cancel
//   };

//   return (
//     <div className='start'>
//       <UserNavbarComponent />
//       <div className="container mt-4 form-container">
//         <Card style={{ width: '30rem', marginTop: '90px', padding: '20px' }} className="mx-auto">
//           <Card.Body>
//             <Card.Title style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '28px' }}>Add New Hobby</Card.Title>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label label-left">Hobby Name</label>
//                 <input
//                   type="text"
//                   className={`form-control ${error && 'is-invalid'}`}
//                   id="name"
//                   name="name"
//                   placeholder="Enter hobby name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   minLength="2"
//                   maxLength="50"
//                 />
//                 {error && <div className="invalid-feedback">{error}</div>}
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label label-left">Description</label>
//                 <input
//                   type="text"
//                   className={`form-control ${error && 'is-invalid'}`}
//                   id="description"
//                   name="description"
//                   placeholder="Enter description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                   minLength="2"
//                   maxLength="100"
//                 />
//                 {error && <div className="invalid-feedback">{error}</div>}
//               </div>
//               <div className="d-flex">
//                 <Button type="submit" className="btn btn-primary">Save</Button>
//                 <Button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</Button>
//               </div>
//             </form>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbarComponent from './UserNavbarComponent';
import Card from 'react-bootstrap/Card';
import '../CSS/AddHobby.css';

export default function AddHobbyComponent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Retrieve userId from localStorage
  const userId = localStorage.getItem('user_id');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User ID is missing');
      return;
    }

    const newHobby = { name, description, userId };

    try {
      const response = await fetch('http://localhost:8080/hobbies/addhobby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHobby),
      });

      if (!response.ok) {
        throw new Error('Failed to add hobby');
      }

      navigate('/hobbylist'); // Redirect to Hobby List page after successful addition
    } catch (error) {
      setError('Failed to add hobby');
      console.error('Error adding hobby:', error);
    }
  };

  const handleCancel = () => {
    navigate('/hobbylist'); // Navigate to Hobby List page on cancel
  };

  return (
    <div className='start'>
      <UserNavbarComponent />
      <div className="container mt-4 form-container">
        <div className="text-center mb-4">
          <Link to="/hobbylist">
            <Button variant="primary" className="btn btn-primary">View Hobby List</Button>
          </Link>
        </div>
        <Card style={{ width: '30rem', padding: '20px' }} className="mx-auto">
          <Card.Body>
            <Card.Title style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '28px' }}>Add New Hobby</Card.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label label-left">Hobby Name</label>
                <input
                  type="text"
                  className={`form-control ${error && 'is-invalid'}`}
                  id="name"
                  name="name"
                  placeholder="Enter hobby name"
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
              <div className="d-flex justify-content-center">
                <Button type="submit" className="btn btn-primary me-2">Save</Button>
                <Button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
