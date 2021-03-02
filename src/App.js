import React,{useState,useEffect} from 'react'
import './App.css';
import Form from './Components/form';
import Table from './Components/table';
import MyMapComponent from "./Components/map";
function App() {
const [formdata,setFormData]=useState([]);
const [marks,setMarks]=useState(false);
 const [display, setdisplayRoute] = useState(false);
 const [routeData,setRouteData]=useState();
  const getFormData=(inp)=>{
      setFormData([...formdata,inp])
      
  }
  const home=()=>{
    setFormData([]);
  }
  const getMarks=()=>{
       setMarks(true)
       
  }
   const showButton = () => {
     let dire = [];
     formdata.forEach((x) => {
       dire.push([+x.longitude, +x.latitude]);
     });
     setRouteData(dire);
    console.log(dire)
   };
  // useEffect(()=>{
  //   // console.log('app',formdata)
  // },[formdata,marks])
  return (
    <div className="App">
      <button className="home" onClick={home}>
        HOME
      </button>
      <div className="container">
        <Form onADD={getFormData} marks={getMarks}/>

        <Table data={formdata} show={showButton}/>

        
          <MyMapComponent datas={formdata} showMarks={marks} dis={routeData}/>
        
      </div>
    </div>
  );
}

export default App;
