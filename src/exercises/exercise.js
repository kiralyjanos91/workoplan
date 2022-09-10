import React, { useState } from "react"
import { Row , Col } from "react-bootstrap"
import { useDispatch , useSelector } from "react-redux"
import { addToSaved , removeFromSaved } from "../savedlist/savedListSlice"
import { addToPlan , removeFromPlan } from "../planner/plannerSlice"
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal'
import "./exercises.css"
import Trashicon from "../images/trashicon.png"
import SaveIcon from "../images/emptysave.png"
import SavedIcon from "../images/filledsave.png"
import CheckIcon from "../images/check-icon.png"

export default function Exercise({ name , equipment , gif , target , bodyPart, atSavedList }){
    const savedArray = useSelector((state)=>state.savedList.list)
    const planner = useSelector((state)=>state.planner.plan)
    const dispatch = useDispatch()
    const exerciseData = {
        name:name,
        gif:gif,
        target:target,
        equipment:equipment,
        bodyPart:bodyPart,
        notes:""
    }
    const isSaved = savedArray.find(exercise=>exercise.name === name)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dropDownList = planner.map((day,index)=>{
        return day.some((exercise)=> exercise.name === name) ? 
            <Dropdown.Item
                className="dropdown-planned"
                key={index}
                onClick={()=>{dispatch(removeFromPlan({day:day[0],exercise:exerciseData}))}}
            >
                {day[0]} <img src={CheckIcon} className="check-icon" alt="check" />
            </Dropdown.Item>
            : 
            <Dropdown.Item
                className="dropdown-not-planned"
                key={index}
                onClick={()=>{dispatch(addToPlan({day:day[0],exercise:exerciseData}))}}
            >
                {day[0]}
            </Dropdown.Item>
    })
    return(
        <>
            <Col md="6" lg="4" className="exercise">
                <DropdownButton className="add-to-plan" id="dropdown-basic-button" title="Add to plan">
                    {dropDownList}
                </DropdownButton>             
                <Col className="exercise-image-container">
                    <div className="savedicon">
                        {!isSaved &&
                            <div
                                onClick={()=>{dispatch(addToSaved(exerciseData))}}
                            >
                                <img src={SaveIcon} alt="saved-icon" className="delete-from-saved"/>
                            </div>
                        }
                        {isSaved &&
                            <div
                                onClick={()=>{dispatch(removeFromSaved(name))}}
                            >
                                {atSavedList ? 
                                    <img src={Trashicon} alt={Trashicon} className="delete-from-saved"/>
                                    : 
                                    <img src={SavedIcon} alt={Trashicon} className="delete-from-saved"/>
                                }
                            </div>
                        }
                    </div>
                    <div className="image-hover-overlay" onClick={handleShow}>
                    </div>
                    <img
                        alt={name}
                        src={gif}
                        className="exercise-img"
                    />
                </Col>
                <p className="exercise-name" onClick={handleShow}>{name}</p>
            </Col>
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <img
                                alt={name}
                                src={gif}
                                className="modal-img float-end"
                                onClick={handleShow}
                                />
                        </Col>
                        <Col md="6" className="pop-up-text">
                            <Modal.Title>{name}</Modal.Title>
                            <p>Equipment: {equipment}</p>
                            <hr/>
                            <p>Body Part: {bodyPart}</p>
                            <hr/>
                            <p>Target muscle: {target}</p>
                            <DropdownButton className="add-to-plan" id="dropdown-basic-button" title="Add to plan">
                                {dropDownList}
                            </DropdownButton>  
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {!atSavedList &&
                        <>
                            {
                            isSaved ?
                                <Button variant="secondary" onClick={()=>{dispatch(removeFromSaved(name))}}>
                                    Unsave
                                </Button>
                            :
                                <Button variant="primary" className="modal-save-button" onClick={()=>{dispatch(addToSaved(exerciseData))}}>
                                    Save
                                </Button>
                            }
                        </>
                    }
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}