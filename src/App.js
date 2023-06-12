import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { addDoc } from 'firebase/firestore';


function App() {
//   const [getTitle, setTitle] = useState("");
//   const [gettextInput, settextInput] = useState("");
//   const [getTask, setTask] = useState("");
//   const [getStatus, setStatus] = useState("To do");
//   const createJob = async () =>{
//     await addDoc
    
//     const add = () => {

//       const document = {
  
//         titel: textInput,
  
//         omschrijving: ''
  
//       }
  
//       const collectie = collection(db, "posts");
  
//       addDoc(collectie, document).then(() => {
  
//         console.log('Ik ben klaar!!!');
  
//       });
  
//     }
// }


return (
  <div className="container p-4 ">
    <div className="row">
      <Link/>
      
    </div>
    <ToastContainer/>
  </div>
);
}

export default App;
