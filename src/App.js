import React, { useEffect } from "react"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route , Routes , useLocation } from "react-router-dom"
import Home from "./home/home"
import Navigation from "./navbar/navbar";
import Exercises from "./exercises/exercises";
import SavedList from "./savedlist/savedlist";
import Planner from "./planner/planner";
import Footer from "./footer/footer";
import { useSelector } from "react-redux"

export default function App() {
  const savedList = useSelector((state)=>state.savedList.list)
  const apiData = useSelector((state)=>state.apidata.value)
  const planner = useSelector((state)=>state.planner.plan)
  const location = useLocation()

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[location])

  useEffect(()=>{
    localStorage.setItem("savedlist",JSON.stringify(savedList))
  },[savedList])

  useEffect(()=>{
    localStorage.setItem("apiData",JSON.stringify(apiData))
  },[apiData])

  useEffect(()=>{
    localStorage.setItem("planner",JSON.stringify(planner))
  },[planner])

  return (
    <div className="App">
      <Navigation />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bodypart/:bodypart/:page" element={<Exercises />} />
            <Route path="/saved" element={<SavedList />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>
        </div> 
      <Footer />
    </div>
  )
}

