import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import { addDoc } from 'firebase/firestore';
import { signInWithGoogle } from "./firebase";


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
    <div className="App">
      <button class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} />
    </div>
  );
}



export default App;
