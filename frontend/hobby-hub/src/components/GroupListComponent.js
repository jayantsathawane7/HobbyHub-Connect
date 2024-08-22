// import { useEffect, useState } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom'; // Import Link for navigation
// import AdminNavbarComponent from "./AdminNavbarComponent";
// import '../CSS/UserListComponent.css'; 

// export default function GroupListComponent() {
//   const [groups, setGroups] = useState([]);
//   const [error, setError] = useState('');

//   // Function to fetch groups
//   const fetchGroups = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/groups/getallgroups');
//       if (!response.ok) {
//         throw new Error('Failed to fetch groups');
//       }
//       const data = await response.json();
//       console.log("Fetched groups:", data); // Log data to verify structure
//       setGroups(data);
//     } catch (error) {
//       setError('Failed to load groups');
//       console.error("Error fetching groups:", error);
//     }
//   };

//   // Fetch groups on component mount
//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   // Function to handle deletion
//   const handleDelete = async (id) => {
//     console.log("Attempting to delete group with ID:", id); // Log id to debug

//     if (!id) {
//       console.error("Group ID is undefined");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:8080/groups/deletegroup/${id}`, {
//         method: 'DELETE',
//       });

//       console.log("Response status:", response.status); // Log response status

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to delete group: ${errorText}`);
//       }

//       // Re-fetch the groups list after deletion
//       fetchGroups();
//     } catch (error) {
//       setError(`Failed to delete group: ${error.message}`);
//       console.error("Error deleting group:", error);
//     }
//   };

//   return (
//     <div className='start'>
//       <AdminNavbarComponent />
//       <h1>Group List</h1>
//       {error && <p className="text-danger">{error}</p>}
//       {groups.length === 0 ? (
//         <div>
//           <p style={{    fontfamily:  'Georgia, serif', 
//     fontsize: '20px'}} >No group created yet. Procdded to create a new group.</p>
//           {/* <Link to="/addgroup" className="btn btn-primary">Create New Group</Link> */}
//         </div>
//       ) : (
//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th>Group No.</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {groups.map((group, index) => (
//               <tr key={group.id}>
//                 <td>{index + 1}</td>
//                 <td>{group.name}</td>
//                 <td>{group.description}</td>
//                 <td>
//                   <Button variant="danger" onClick={() => handleDelete(group.id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNavbarComponent from "./AdminNavbarComponent";
import '../CSS/UserListComponent.css';

export default function GroupListComponent() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to fetch groups
  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:8080/groups/getallgroups');
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      const data = await response.json();
      console.log("Fetched groups:", data); // Log data to verify structure
      setGroups(data);
      setError('');
    } catch (error) {
      setError('Failed to load groups');
      console.error("Error fetching groups:", error);
    }
  };

  // Fetch groups on component mount
  useEffect(() => {
    fetchGroups();
  }, []);

  // Function to handle deletion
  const handleDelete = async (id) => {
    if (!id) {
      console.error("Group ID is undefined");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/groups/deletegroup/${id}`, {
        method: 'DELETE',
      });

      console.log("Response status:", response.status); // Log response status

      if (response.ok) {
        setSuccess('Group successfully deleted');
        fetchGroups(); // Re-fetch the groups list after deletion
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete group: ${errorText}`);
      }
    } catch (error) {
      setError(`Failed to delete group: ${error.message}`);
      console.error("Error deleting group:", error);
    }
  };

  return (
    <div className='start'>
      <AdminNavbarComponent />
      <div className='container mt-4'>
        <h1>Group List</h1>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        {groups.length === 0 ? (
          <div>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px' }}>
              No groups created yet. Proceed to create a new group.
            </p>
            <Link to="/addgroup" className="btn btn-primary">Create New Group</Link>
          </div>
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Group No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={group.id}>
                  <td>{index + 1}</td>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(group.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
