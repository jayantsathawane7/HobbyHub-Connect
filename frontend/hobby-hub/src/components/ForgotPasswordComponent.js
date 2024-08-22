import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../CSS/resetPassword.css';
import NavbarComponent from './NavbarComponent';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import '../CSS/Style.css';
import UserNavbarComponent from './UserNavbarComponent'
import '../CSS/UpdateProfile.css'
export default function ForgotPasswordComponent() {
    const navigate = useNavigate();
    const [uid, setUid] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const params = new URLSearchParams({
                uid,
                newPassword
            }).toString();

            const response = await fetch(`http://localhost:8080/login/reset-password?${params}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to reset password.');
            }

            const result = await response.text();
            setMessage(result);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div className='start'>
            <NavbarComponent />
            <div className="container mt-5">
                <Card className="p-4 shadow-sm">
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Reset Password</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="uid">
                                <Form.Label>UID</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={uid}
                                    onChange={(e) => setUid(e.target.value)}
                                    placeholder="Enter your UID"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                />
                            </Form.Group>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="info">{message}</Alert>}
                            <Button type="submit" className="w-100">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
