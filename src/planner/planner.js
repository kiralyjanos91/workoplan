import React, { useState } from "react";
import "./planner.css";
import { useSelector , useDispatch } from "react-redux";
import { Col , Row , Container } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import PlanDeleteIcon from "../images/plan-delete.png";
import UpIcon from "../images/up.png";
import DownIcon from "../images/down.png";
import { addToSaved , removeFromSaved } from "../savedlist/savedListSlice"
import { addToPlan , removeFromPlan , moveUp , moveDown , updateNotes } from "./plannerSlice";
import EmptyList from "../emptylist/emptylist";

export default function Planner(){
    const [ selectedDay , setSelectedDay ] = useState("all")
    const dispatch = useDispatch()
    const planner = useSelector((state)=>state.planner.plan)
    const savedArray = useSelector((state)=>state.savedList.list)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = ({ event , name , gif , equipment , bodyPart , target }) => {
        event.stopPropagation()
        setModalData({ name , gif , equipment , bodyPart , target })
        setShow(true)
    }

    const [ modalData , setModalData ] = useState({})

    const planList = planner.filter((content)=>{
        return content.length > 1 && selectedDay === "all" ? true : content[0] === selectedDay
    }).map((day)=>{
        return day.map((el,index)=>{
            return index === 0 ?
                <Row>
                    {selectedDay === "all" &&<h3 className="planned-day">{el}</h3>} 
                </Row>
                :
                <Row className="plan-item">
                    <Row className="plan-item-first-line">
                        <Col md="6" className="index-and-arrows">
                            <Row>    
                                <Col className="exercise-index"><h4>{index}.</h4></Col>
                                <Col className="plan-move">
                                    {index > 1 &&
                                        <div 
                                        className="plan-up"
                                        onClick={()=>dispatch(moveUp([index,day[0]]))}
                                        >
                                            <img src={UpIcon} alt={UpIcon} className="ip-icon"/>
                                        </div>
                                    }
                                </Col>
                                <Col className="plan-move">
                                    {index < day.length - 1 &&
                                        <div
                                        className="plan-Down"
                                        onClick={()=>dispatch(moveDown([index,day[0]]))}
                                        >
                                            <img src={DownIcon} alt={DownIcon} className="down-icon"/>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col 
                            md="6"
                            className="plan-name"
                            onClick={(event)=>handleShow({
                                event,
                                name:el.name,
                                gif:el.gif,
                                equipment:el.equipment,
                                bodyPart:el.bodyPart,
                                target:el.target
                            })}
                        >
                            {el.name} - {el.bodyPart}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col sm="12">
                                    <textarea
                                        className="plan-note"
                                        placeholder="Notes (3 x 10 etc)"
                                        value={el.notes}
                                        onChange={(e)=>dispatch(updateNotes({
                                            index:index,
                                            day:day[0],
                                            notes:e.target.value
                                        }))}
                                    >
                                    </textarea>
                                </Col>
                            </Row>
                            <Row className="plan-buttons">
                                <Col md="6">
                                    <Button
                                    variant="primary" 
                                    className="remove-from-plan button primary-color-button" 
                                    onClick={()=>{
                                        dispatch(removeFromPlan({day:day[0],exercise:el}))}}
                                    >
                                        Remove {<img src={PlanDeleteIcon} alt="delete" className="delete-from-plan"/>}
                                    </Button>
                                </Col>
                                <Col md="6" className="choose-day-col">
                                    <DropdownButton id="dropdown-basic-button" className="primary-color-button" title="Add to another days">
                                        {
                                            planner.filter((days)=>{return !days.some((ex)=>{return ex.name === el.name})}).map((day,index)=>{
                                                return <Dropdown.Item
                                                    key={index}
                                                    onClick={()=>dispatch(addToPlan({
                                                        day:day[0],
                                                        exercise:el
                                                    }))}
                                                >
                                                    {day[0]}
                                                </Dropdown.Item>
                                            })
                                        }                           
                                        <Dropdown.Item
                                            key="all"
                                            onClick={()=>setSelectedDay("all")}
                                        > 
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Col>
                    </Row>                            
                    <hr />  
                </Row>    
        })
    })

    const plannedDaysList = planner.filter((el)=>el.length > 1).map((day,index)=>(
        <Dropdown.Item
            key={index}
            onClick={()=>setSelectedDay(day[0])}
        >
            {day[0]}
        </Dropdown.Item>
    ))

    if(selectedDay !== "all" && planner.find((days)=> {return days[0]===selectedDay}).length < 2)
        {setSelectedDay("all")}

    return(
        plannedDaysList.length > 0 ?
            <Container className="plan-list">
                <Row className="planned-days-list-header">
                    <Col md="6" className="planned-headline-col">
                        <h1 className="planned-headline">Workout Plan ({selectedDay})</h1>
                    </Col>
                    <Col md="6" className="choose-day-button-col">
                        {plannedDaysList.length > 1 &&
                        <DropdownButton id="dropdown-basic-button" className="plan-dropdown" title="Choose a day">
                            <Dropdown.Item
                                key="planner-all"
                                onClick={()=>setSelectedDay("all")}
                            >
                                All
                            </Dropdown.Item>
                            {plannedDaysList}
                        </DropdownButton>
                        }
                    </Col>
                </Row>
                <Row className="plan-list">
                    {planList}
                    <Modal show={show} onHide={handleClose} fullscreen={true}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col md="6">
                                    <img
                                        alt={modalData.name}
                                        src={modalData.gif}
                                        className="modal-img float-end"
                                    />
                                </Col>
                                <Col md="6" className="pop-up-text">
                                    <Modal.Title>{modalData.name}</Modal.Title>
                                    <p>Equipment: {modalData.equipment}</p>
                                    <hr/>
                                    <p>Body Part: {modalData.bodyPart}</p>
                                    <hr/>
                                    <p>Target muscle: {modalData.target}</p>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            {savedArray.find(exercise=>exercise.name === modalData.name) ?
                                <Button variant="secondary" onClick={()=>dispatch(removeFromSaved(modalData.name))}>
                                    Unsave
                                </Button>
                            :
                                <Button variant="primary" className="modal-save-button" onClick={()=>dispatch(addToSaved({
                                    name:modalData.name,
                                    gif:modalData.gif,
                                    target:modalData.target,
                                    equipment:modalData.equipment,
                                    bodyPart:modalData.bodyPart,
                                }))}>
                                    Save
                                </Button>
                            }
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
        :
        <EmptyList 
        name="plan"
        />
    )
}