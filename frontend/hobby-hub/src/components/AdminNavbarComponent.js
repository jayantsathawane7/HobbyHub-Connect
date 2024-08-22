import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import "../CSS/UserHomeComponent.css";
import logo1 from "../images/treklogo.png";
import logo2 from "../images/Designer (1).jpeg";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export default function AdminNavbarComponent() {
    const loggedst = localStorage.getItem('loggedstatus');
    console.log("logged status " + loggedst);

    return (
        <div>
            <Container fluid>
                <Row>
                    <nav className="navbar navbar-expand-sm c-navcolor navbar-sticky" style={{ display: loggedst ? "block" : "none" }}>
                        <div className="container-fluid">
                            <div className="c-webname">
                                <img src={logo1} height="40px" width="40px" alt="Logo" />
                                &ensp;&ensp; HobbyHub
                            </div>

                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                   <Link to="/userlist" style={{textDecoration:"none"}} className="c-navlink px-3">UserList</Link>
                                </li>
                                <li className="nav-item">
                                   <Link to="/grouplist" style={{textDecoration:"none"}} className="c-navlink px-3">GroupList</Link>
                              </li>
                                <li className="nav-item">
                                  <Link to="/addgroup" style={{textDecoration:"none"}} className="c-navlink px-3">AddGroup</Link>
                                </li>
                                <li className="nav-item">
                                   <Link to="/event" style={{textDecoration:"none"}} className="c-navlink px-3">Event</Link>
                               </li>
                                {/* <li className="nav-item">
                                    <Link to="/addhobby" className="c-navlink px-3">Add Hobby</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id="user-dropdown" className="c-navlink px-3">
                                            <i className="fas fa-user"></i> 
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to="/admin_profile">
                                                <i className="fas fa-user-circle"></i> Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/logout">
                                                <i className="fas fa-sign-out-alt"></i> Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Col md={{ span: 4, offset: 4 }}>
                    </Col>
                </Row>
                <Outlet />
            </Container>
        </div>
    )
}