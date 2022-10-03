import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "./navbar.css"
import Logo from "../images/logo.png"

export default function Navigation() {
  const savedArray = useSelector((state)=>state.savedList.list)
  const apiData = useSelector((state)=>state.apidata.value)

  const dropDownItems = Object.keys(apiData).map((part,index)=>{
    const partName = part.replaceAll(" ","-")
    return (
      <NavDropdown.Item key={index} className="nav-dropdown-item">
        <Nav.Link className="dropItem" as={Link} eventKey={partName} to={`/bodypart/${partName}/1`}>
          {part}
        </Nav.Link>
      </NavDropdown.Item>)
  })

  return (
    <Navbar collapseOnSelect bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={Logo} alt="logo" className="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={"/"} eventKey="/">
                Home
            </Nav.Link>
            <NavDropdown title="Body parts" id="basic-nav-dropdown" className="navigation-dropdown">
              {dropDownItems}
            </NavDropdown>
            <Nav.Link as={Link} to={"/saved"} eventKey="/saved">
                Saved <span key="savedCount" className="savedcount">{ savedArray.length }</span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/planner"} eventKey="/planner">
                Plan
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
