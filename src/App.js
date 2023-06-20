import { useEffect, useState } from "react";
import { signInWithGoogle } from "./firebase";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import { getDocs, collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddPost = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        desc: desc,
        uid: user.uid,
      });
      setTitle("");
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="App">
      {!user && (
        <button className="login-with-google-btn" onClick={handleSignInWithGoogle}>
          Sign in with Google
        </button>
      )}

      {user && (
        <div>
          <h1>{user.displayName}</h1>
          <h1>{user.email}</h1>
          <img src={user.photoURL} alt="Profile" />
          <button onClick={handleLogout}>Logout</button>

          <div className="add">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              type="text"
              placeholder="Desc"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
            />
            <button onClick={handleAddPost}>Add Post</button>
          </div>

          <h2>Posts:</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="App">
        <SignIn />
        <SignUp />
        <AuthDetails />
      </div>
    </div>
  );
}

export default App;
