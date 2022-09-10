import React from "react"
import { Container , Col , Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./footer.css"

export default function Footer(){
    return(
        <div className="footer">
            <Container>
                <Row className="footer-items">
                    <Col md="6" className="footer-logo">
                        ©2022 - All rights reserved.
                    </Col>
                    <Col md="6" className="footer-menu">
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/saved">
                            Saved List
                        </Link>
                        <Link to="/planner">
                            Plan List
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}