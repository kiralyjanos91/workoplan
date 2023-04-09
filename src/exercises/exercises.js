import React, { useEffect , useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"
import { apiDataUpdate } from "../apidata/apiDataSlice"
import Exercise from "./exercise"
import { Container , Row } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner';
import SitePagination from "./pagination/pagination";

export default function Exercises(){
    let { bodypart , page } = useParams()
    const dispatch = useDispatch()
    const apiData = useSelector((state)=>state.apidata.value)
    const bodyPartWithSpace = bodypart.replaceAll("-"," ")
    const [ isLoading , setIsLoading ] = useState("true")

    useEffect(()=>{
        if (!apiData[bodyPartWithSpace].length){
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '56bd2c0a8bmshb28498e9bd62633p1d4ce4jsn48be7ca34c90',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };
            
            fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPartWithSpace}`, options)
                .then(response => response.json())
                .then(response => {
                    dispatch(apiDataUpdate({...apiData,[bodyPartWithSpace]:response}))
                    console.log(response)
                }
                )
                .catch(err => console.error(err))
        }
        setIsLoading(false) 
    },[bodypart])
    
    const exercisesFrom = parseInt((page-1) * 9)
    const exercisesTo = exercisesFrom + 9
    const exercisesList = apiData[bodyPartWithSpace].slice(exercisesFrom,exercisesTo).map((exercise,index)=>
        <Exercise 
            key={index}
            name={exercise.name}
            equipment={exercise.equipment}
            gif={exercise.gifUrl}
            target={exercise.target}
            bodyPart={bodyPartWithSpace}
        />
    )

    return(
        <div className="exercises-page">
            {isLoading &&
                <Container className="exercises-loading-screen">
                    <Spinner animation="border" variant="light" />
                </Container>
            }
            {!isLoading &&
                
                    <Container className="exerciselist">
                        <Row className="exercises-headline">
                            <h1>
                                {bodyPartWithSpace.charAt(0).toUpperCase() + bodyPartWithSpace.slice(1)} exercises
                            </h1>
                        </Row>
                        <Row className="exercise-list">
                            {exercisesList}
                        </Row>
                        <Row>
                            <SitePagination
                                activePage={page}
                                pageCount={Math.ceil(apiData[bodyPartWithSpace].length / 9)}
                                bodyPart={bodypart}
                            />
                        </Row>
                    </Container>
            }
        </div>
    )
}