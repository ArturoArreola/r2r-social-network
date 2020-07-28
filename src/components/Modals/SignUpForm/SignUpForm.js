import React from 'react';
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "./SignUpForm.scss";

export default function SignUpForm(props) {
    
    const { setShowModal } = props;
    const onSubmit = e => {
        e.preventDefault();
        setShowModal(false);
    };

    const handleClose = () => setShowModal(false);
    
    return (
        <div className="sign-up-form">
            <h2>Join Now</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Name" />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Last Name" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Confirm Password" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="actionButtons">
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}
