import React, { useState } from "react"
import { useSelector } from "react-redux"
import Exercise from "../exercises/exercise"
import { Container , Row , Col } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./savedlist.css"
import EmptyList from "../emptylist/emptylist";

export default function SavedList(){
    
    const savedList = useSelector((state)=>state.savedList.list)

    const savedBodyPartsList = savedList.reduce((accumulator,current)=>{
        return accumulator.includes(current.bodyPart) ? accumulator : [...accumulator,current.bodyPart]
    },["all"]).map((bodyPart,index)=>{
        return <Dropdown.Item key={index} onClick={()=>{setSelectedPart(bodyPart)}}>{bodyPart}</Dropdown.Item>
    })

    const [ selectedPart , setSelectedPart ] = useState("all")

    const exercisesList = savedList.filter((exercise)=>{return exercise.bodyPart === (selectedPart === "all" ? exercise.bodyPart : selectedPart)}).map((exercise,index)=>
        <Exercise 
            key={index}
            name={exercise.name}
            equipment={exercise.equipment}
            gif={exercise.gif}
            target={exercise.target}
            bodyPart={exercise.bodyPart}
            atSavedList={true}
        />
    )

    if(selectedPart !== "all" && savedList.filter((exercise)=> exercise.bodyPart === selectedPart).length < 1)
        {setSelectedPart("all")}

    return(
        savedBodyPartsList.length > 1 ?
            <Container className="savedlist">
                <Row className="saved-header">
                    <Col>
                        <h1 className="saved-headline">Saved { selectedPart === "all" ? (savedBodyPartsList.length === 2 ? savedList[0].bodyPart : null) : selectedPart } exercises</h1>
                    </Col>
                    {savedBodyPartsList.length > 2 &&
                        <Col className="savedbodypartslist">     
                                <DropdownButton id="dropdown-basic-button" className="float-end saved-list-dropdown" title="Choose Body Part">
                                    {savedBodyPartsList}
                                </DropdownButton>
                        </Col>
                    }
                </Row>
                <Row className="savedlist">
                    {exercisesList}
                </Row>
            </Container>
            :
            <EmptyList 
                name="saved"
            />
    )
}