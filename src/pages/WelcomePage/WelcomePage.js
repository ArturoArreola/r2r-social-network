import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faAddressBook, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modals/BasicModal";
import SignUpForm from "../../components/Modals/SignUpForm";
import FaceLogo from "../../assets/face.png";
import People from "../../assets/people.jpg";
import "./WelcomePage.scss";
 
export default function WelcomePage() {

    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState (null);
    const openModal = content => {
        setShowModal(true);
        setContentModal(content);
    }

    return(
        <>
            <Container className="welcome-page" fluid>
                <Row>
                    <PanelIzquierdo />
                    <PanelDerecho openModal={openModal} setShowModal={setShowModal} />
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function PanelIzquierdo(){
    return(
        <Col className="welcome-page_left" xs={6}>
            <img src={People} alt="People"/>
            <div>
                <h4>
                    <FontAwesomeIcon icon={faNewspaper} />
                    &nbsp; See updates from friends in News Feed.
                </h4>
                <br/>
                <h4>
                    <FontAwesomeIcon icon={faAddressBook} />
                    &nbsp; Share what's new in your life on your Timeline.
                </h4>
                <br/>
                <h4>
                    <FontAwesomeIcon icon={faProjectDiagram} />
                    &nbsp; Make new friends in this Network.
                </h4>
            </div>
        </Col>
    );
}

function PanelDerecho(props){
    
    const {openModal, setShowModal} = props;
    return(
        <Col className="welcome-page_right" xs={6}>
            <img src={FaceLogo} alt="FaceLogo" height={150}/>
            <div>
                <h3>Sign Up to R2R Social</h3>
                <h4>It's quick and easy</h4>
                <Button 
                    variant="warning"
                    onClick={ ()=> openModal(<SignUpForm setShowModal={ setShowModal } />) }
                >
                    Sign Up
                </Button>
                <Button 
                    variant="outline-warning"
                    onClick={ ()=> openModal(<h2>Sign In</h2>) }
                >
                    Log In
                </Button>
            </div>
        </Col>
    );
}