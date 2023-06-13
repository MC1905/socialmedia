import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import { addDoc } from 'firebase/firestore';
import { signInWithGoogle } from "./firebase";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';


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
  const logout =()=>{
    localStorage.clear()
    window.location.reload()
  }


  return (
    <div className="App">
      <button class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} />
      <button onClick={logout}>Logout</button>
      
      <div className="App">
      <SignIn />
      <SignUp />
      <AuthDetails />
    </div>

    </div>

    

    
  );
}



export default App;
