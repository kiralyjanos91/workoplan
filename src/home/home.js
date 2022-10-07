import React, { useState , useEffect } from "react"
import {Link as ScrollLink} from 'react-scroll'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image";
import Spinner from 'react-bootstrap/Spinner';
import BodyPart from "./bodypart"
import "./home.css"
import { useSelector , useDispatch } from "react-redux"
import { apiDataUpdate } from "../apidata/apiDataSlice"
import coverImg from "../images/exerciseimg.jpg"
import DownIcon from "../images/down.png";

export default function Home(){
    const apiData = useSelector((state)=>state.apidata.value)
    const dispatch = useDispatch()
    const [ isLoading , setIsLoading ] = useState("true")
    useEffect(()=>{
        if (!Object.keys(apiData).length)
        {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'RapidApi exercisedb Api Key',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };   
            fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', options)
                .then(response => response.json())
                .then(response => dispatch(apiDataUpdate(response.reduce((accumulator,current)=>{
                    return {...accumulator, [current]:[]}
                },{}))))
                .catch(err => console.error(err));
        }
        setIsLoading(false)
    },[])

    const bodyParts = Object.keys(apiData).map((part)=>
        <BodyPart
            key={part}
            name={part}
        />
    )
    return(
        <div className="home-page">
            {isLoading &&
                <Container className="loading-screen">
                    <Spinner animation="border" variant="light" />
                </Container>
            }
            {!isLoading &&
            <div className="bodyparts">
                <Container className="cover-image-container">
                    <Row className="cover-row">
                        <Col className="cover-text-col">
                            <Row className="cover-text-elements">
                                <ScrollLink to="bodyPartsSection">
                                    <Row>
                                        <h2 className="cover-text">Plan The Perfect Workout</h2>
                                    </Row>
                                    <Row>
                                        <h4 className="start-now">Start Now</h4>
                                    </Row>
                                    <Row className="down-icon-row">
                                        <img src={DownIcon} alt={DownIcon} className="start-now-down"/>
                                    </Row>
                                </ScrollLink>
                            </Row>
                        </Col>
                        <Col className="cover-image-col">
                            <Image src={coverImg} className="img-fluid cover-image"/>
                        </Col>
                    </Row>
                </Container>
                <Container id="bodyPartsSection">
                    <Row>
                        <h3>
                            Choose a body part:
                        </h3>
                    </Row>
                    <Row className="bodypartlist">
                        {bodyParts}
                    </Row>
                </Container>    
            </div>
            }
        </div>
    )
}
