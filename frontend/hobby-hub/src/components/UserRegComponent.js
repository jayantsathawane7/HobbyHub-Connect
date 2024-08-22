// import '../CSS/Registration.css';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavbarComponent from './NavbarComponent';
import '../CSS/Style.css';
import UserNavbarComponent from './UserNavbarComponent'
import '../CSS/UpdateProfile.css'
export default function UserRegComponent() {
    const initialState = {
        email: { value: "", hasError: true, error: "", touched: false },
        fname: { value: "", hasError: true, error: "", touched: false },
        lname: { value: "", hasError: true, error: "", touched: false },
        contact: { value: "", hasError: true, error: "", touched: false },
        uid: { value: "", hasError: true, error: "", touched: false },
        pwd: { value: "", hasError: true, error: "", touched: false },
        isFormValid: false
    };

    const navigate = useNavigate();

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                const { name, value, hasError, error, touched, isFormValid } = action.data;
                return { ...state, [name]: { value, hasError, error, touched }, isFormValid };
            case 'reset':
                return initialState;
            default:
                return state;
        }
    };

    const [user, dispatch] = useReducer(reducer, initialState);
    const [msg, setMsg] = useState("...");

    const handleChange = (name, value) => {
        const { hasError, error } = validateData(name, value);

        let isFormValid = true;
        for (const key in user) {
            if (user[key].hasError === true) {
                isFormValid = false;
                break;
            }
        }

        dispatch({ type: 'update', data: { name, value, hasError, error, touched: true, isFormValid } });
    };

    const validateData = (name, value) => {
        let hasError = false;
        let error = "";

        switch (name) {
            case "email":
                let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!emailRegex.test(value)) {
                    hasError = true;
                    error = "Email should be valid";
                }
                break;
            case "fname":
                let fnameRegex = /^[A-Za-z]{1,15}$/;
                if (!fnameRegex.test(value)) {
                    hasError = true;
                    error = "First Name should be valid and not more than 15 characters";
                }
                break;
            case "lname":
                let lnameRegex = /^[A-Za-z]{1,15}$/;
                if (!lnameRegex.test(value)) {
                    hasError = true;
                    error = "Last Name should be valid and not more than 15 characters";
                }
                break;
            case "contact":
                let contactRegex = /^[0-9]{10}$/;
                if (!contactRegex.test(value)) {
                    hasError = true;
                    error = "Contact should be of 10 digits only";
                }
                break;
            case "uid":
                if (value.trim() === "") {
                    hasError = true;
                    error = "User ID is required";
                }
                break;
            case "pwd":
                let pwdRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{4,}$/;
                if (!pwdRegex.test(value)) {
                    hasError = true;
                    error = "Password should be more than 5 characters and include a number and special symbol (e.g., Abc@123)";
                }
                break;
            default:
                break;
        }

        return { hasError, error };
    };

    const submitData = (ev) => {
        ev.preventDefault();

        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                uid: user.uid.value,
                pwd: user.pwd.value,
                fname: user.fname.value,
                lname: user.lname.value,
                email: user.email.value,
                contact: user.contact.value,
                roleid: 2
            })
        };

        fetch("http://localhost:8080/registration/userreg", reqOptions)
            .then(res => res.text())
            .then(data => setMsg(data))
            .then(() => {
                alert("Registration successful!");
                navigate("/login");
            })
            .catch(() => alert("Registration failed. Please try again."));
    };

    return (
        <div className='start'>
            <NavbarComponent />
            <div className="container mt-4 form-container">
                <Card style={{ width: '30rem', marginTop: '90px', padding: '20px' }} className="mx-auto">
                    <Card.Body>
                        <Card.Title style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '28px' }}>Registration</Card.Title>
                        <form onSubmit={submitData}>
                            <div className="mb-3">
                                <label htmlFor="uid" className="form-label label-left">User ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="uid"
                                    name="uid"
                                    value={user.uid.value}
                                    onChange={(e) => { handleChange("uid", e.target.value) }}
                                    required
                                />
                                <p style={{ display: user.uid.touched && user.uid.hasError ? "block" : "none", color: "red" }}>{user.uid.error}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label label-left">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={user.email.value}
                                    onChange={(e) => { handleChange("email", e.target.value) }}
                                    required
                                />
                                <p style={{ display: user.email.touched && user.email.hasError ? "block" : "none", color: "red" }}>{user.email.error}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fname" className="form-label label-left">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fname"
                                    name="fname"
                                    value={user.fname.value}
                                    onChange={(e) => { handleChange("fname", e.target.value) }}
                                    required
                                    minLength="2"
                                    maxLength="15"
                                />
                                <p style={{ display: user.fname.touched && user.fname.hasError ? "block" : "none", color: "red" }}>{user.fname.error}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lname" className="form-label label-left">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lname"
                                    name="lname"
                                    value={user.lname.value}
                                    onChange={(e) => { handleChange("lname", e.target.value) }}
                                    required
                                    minLength="2"
                                    maxLength="15"
                                />
                                <p style={{ display: user.lname.touched && user.lname.hasError ? "block" : "none", color: "red" }}>{user.lname.error}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label label-left">Contact</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contact"
                                    name="contact"
                                    value={user.contact.value}
                                    onChange={(e) => { handleChange("contact", e.target.value) }}
                                    required
                                    pattern="\d{10}"
                                />
                                <p style={{ display: user.contact.touched && user.contact.hasError ? "block" : "none", color: "red" }}>{user.contact.error}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label label-left">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="pwd"
                                    name="pwd"
                                    value={user.pwd.value}
                                    onChange={(e) => { handleChange("pwd", e.target.value) }}
                                    required
                                />
                                <p style={{ display: user.pwd.touched && user.pwd.hasError ? "block" : "none", color: "red" }}>{user.pwd.error}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-outline-primary" style={{ width: '45%' }}>
                                    Register
                                </button>
                                <button type="reset" className="btn btn-outline-secondary" onClick={() => dispatch({ type: 'reset' })} style={{ width: '45%' }}>
                                    Clear
                                </button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
