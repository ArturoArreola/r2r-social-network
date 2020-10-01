import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import "./BasicLayout.scss";

export default function BasicLayout(props) {

    const { className, children } = props;
    console.log('Props -> ', props);
    return (
        <Container className={`basic-layout ${className}`}>
            <Row>
                <Col xs={3} className="basic-layout__menu">
                    <h2>Side Menu</h2>
                </Col>
                <Col xs={9} className="basic-layout__content">
                    { children }
                </Col>
            </Row>
        </Container>
    )
}
