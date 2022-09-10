import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom" 
import { Col , Row , Container } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./emptylist.css"

export default function EmptyList({name}){

  const apiData = useSelector((state)=>state.apidata.value)
  const dropButtonItems = Object.keys(apiData).map((part,index)=>{
    const partName = part.replaceAll(" ","-")
    return (
      <Dropdown.Item as={Link} key={index} className="empty-list-dropdown-item" to={`/bodypart/${partName}/1`}>
          {part}
      </Dropdown.Item>)
  })

    return(
        <Container className="empty-list">
            <Row>
                <Row>
                    <Col>
                        <h1>
                            Your {name} list is empty
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            choose a body part and add exercises to your list
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DropdownButton id="dropdown-basic-button" title="Body parts" className="empty-dropdown">
                            {dropButtonItems}
                        </DropdownButton>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}