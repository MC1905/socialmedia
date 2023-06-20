import { useEffect, useState } from "react";
import { signInWithGoogle } from "./firebase";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("title", ">=", searchTerm));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {!user ? (
        <div>
          <button className="login-with-google-btn" onClick={handleSignInWithGoogle}>
            Sign in with Google
          </button>

          <h2>Posts:</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
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

          <div className="search">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <h2>Posts:</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                {user && post.uid === user.uid && (
                  <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>Delete</button>
                )}
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
