import React from "react"
import { Link } from "react-router-dom"
import { Col } from "react-bootstrap"

export default function BodyPart({name}){
    return(
        <Col md="6" lg="4" className="bodypart">
            <Link className="bodypart-link" to={`/bodypart/${name.replaceAll(" ","-")}/1`}>
                <Col className="bodypart-image-col">
                    <div className="bodyPart-image-overlay">
                        <p className="bodypartname">{name}</p>
                    </div>
                    <img 
                        src={require(`../images/${name.replaceAll(" ","-")}.jpeg`)}
                        alt={name} 
                        className="bodypartimage"
                    />
                </Col>
            </Link>
        </Col>
    )
}