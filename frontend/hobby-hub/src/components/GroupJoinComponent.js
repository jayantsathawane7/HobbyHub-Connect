import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import UserNavbarComponent from './UserNavbarComponent';
import { FaPeopleGroup } from 'react-icons/fa'; // Import an icon from react-icons
import '../CSS/GroupJoinComponent.css'; // Ensure this file contains the styles

export default function GroupJoinComponent() {
    const [groups, setGroups] = useState([]);
    const [loginId, setLoginId] = useState(null); 
    const [membershipStatus, setMembershipStatus] = useState({});

    useEffect(() => {
        const storedLoginId = localStorage.getItem('user_id');
        if (!storedLoginId) {
            console.error("No loginId found in storage.");
            return;
        }
        setLoginId(storedLoginId); 

        // Fetch all groups from the backend
        axios.get('http://localhost:8080/groups/getallgroups')
            .then(response => {
                setGroups(response.data);

                // Fetch membership status for each group
                response.data.forEach(group => {
                    axios.get(`http://localhost:8080/groups/${group.groupId}/isMember/${storedLoginId}`)
                        .then(res => {
                            setMembershipStatus(prevStatus => ({
                                ...prevStatus,
                                [group.groupId]: res.data
                            }));
                        })
                        .catch(err => {
                            console.error(`Error checking membership for group ${group.groupId}`, err);
                        });
                });
            })
            .catch(error => {
                console.error("There was an error fetching the groups!", error);
            });
    }, []);

    const handleJoinGroup = (groupId) => {
        if (!loginId) {
            alert("Please log in first.");
            return;
        }
        
        axios.post('http://localhost:8080/groups/join', {
            groupId: groupId,
            userId: loginId
        })
        .then(response => {
            alert("Joined group successfully!");
            setMembershipStatus(prevStatus => ({
                ...prevStatus,
                [groupId]: true
            }));
        })
        .catch(error => {
            console.error("There was an error joining the group!", error);
            alert("Failed to join the group. Please try again.");
        });
    };

    return (
        <div className="start">
            <UserNavbarComponent />
            <section id="advertisers" className="advertisers-service-sec pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="section-header text-center">
                            <h3 className="fw-bold fs-1">All Groups</h3>
                        </div>
                    </div>
                    <div className="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">
                        {groups.map(group => (
                            <Col key={group.groupId} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
                                <div className="service-card d-flex flex-column">
                                <div className="icon-wrapper">
                                        <i className="fa-solid fa-people-group"></i>
                                    </div>
                                    <h3>{group.name}</h3> 
                                    <p>{group.description}</p>
                                    <button 
                                        className={`btn mt-auto ${membershipStatus[group.groupId] ? 'btn-secondary' : 'btn-outline-primary'}`}
                                        style={{ fontFamily: 'Georgia, serif' }}
                                        onClick={() => handleJoinGroup(group.groupId)}
                                        disabled={membershipStatus[group.groupId]}
                                    >
                                        {membershipStatus[group.groupId] ? 'Already a Member' : 'Join Group'}
                                    </button>
                                </div>
                            </Col>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
