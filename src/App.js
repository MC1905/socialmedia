import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';


function App() {
  const [getTitle, setTitle] = useState("");
  const [gettextInput, settextInput] = useState("");
  const [getTask, setTask] = useState("");
  const [getStatus, setStatus] = useState("To do");
  const createJob = async () =>{
    await addDoc
    
    const add = () => {

      const document = {
  
        titel: textInput,
  
        omschrijving: ''
  
      }
  
      const collectie = collection(db, "posts");
  
      addDoc(collectie, document).then(() => {
  
        console.log('Ik ben klaar!!!');
  
      });
  
    }
}


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
