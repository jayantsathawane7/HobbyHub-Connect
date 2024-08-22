
import "../CSS/Footer.css"
import { Button, Container } from "react-bootstrap"
import { Col, Row } from "react-bootstrap"
import {BsFacebook,BsInstagram,BsLinkedin,BsTwitter,BsFillTelephoneFill} from "react-icons/bs";
import {BiCopyright} from "react-icons/bi"
import {SiGmail} from "react-icons/si"
import happy from "../images/hobby.jpg"


export default function FooterComponent() {
    return (
        <div>
            <Container fluid className="c-footermainclass">
                <Row  >
                    <Col xs={6} md={4} >
                        <div className="c-footerdiv">
                            <div >
                                <h1>HOBBYHUB</h1>

                                <p>
                                    This website will help users to join in a group based on shared hobbies and interests.

                                </p>
                            </div>
                        </div>

                    </Col>
                     <Col xs={6} md={4}>
                        <div className="c-footerdiv">
                            <div className="c-footerdivhappycust" >
                              <h5></h5>
                              <img src={happy} ></img>
                            </div>
                        </div>


                    </Col> 

                    <Col xs={6} md={4}>
                        
                        <div className="c-footerdivthird">
                            <div>
                            <h4><b>Contact us</b></h4>
                            <br></br>
                            <br></br>
                            <h5><span><BsFillTelephoneFill/></span>&ensp;&ensp;&ensp;8888888888</h5>
                            <h5><span><SiGmail/></span>&ensp;&ensp;&ensp;hobbyhub@gmail.com</h5>
                            <br></br>
                            <div className="c-footericon">
                            < BsFacebook size="25px"/> 
                              <BsInstagram size="25px"/> 
                              <BsLinkedin size="25px"/> 
                             <BsTwitter size="25px"/>  
                            </div>
                            </div>
                        </div>

                    </Col>

                </Row>
                <Row>
                    <Col xs={12}>
                       <div className="c-footecopyright">
                        <div>
                        <p>  <BiCopyright/> 2024 HOBBYHUB</p>
                        </div>
                       
                       </div>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}