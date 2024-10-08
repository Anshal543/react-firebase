import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { useState } from "react";
import { useEffect } from "react";
import { db,auth } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useUser } from "../user-context/User-context";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const style = {
  bg: `h-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function Homepage() {
  // const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
//   const [user, setUser] = useState(null);
const { user, setUser,todos,setTodos } = useUser();




  if(!user){
    navigate('/login')
  }



  // add todo to firebase

  const createTodo = async (e) => {
    e.preventDefault();
    if (!input || !user) return;
    const value = input.trim();
    setInput("");
    await addDoc(collection(db, "todos"), {
      text: value,
      completed: false,
      uid: user.uid,  // Store user's UID
    });
  };



  // read todos from firebase
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "todos"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
      console.log("Todos fetched and set in context");
    });
    return () => unsubscribe();
  }, [user]);

  // update todo from firebase
  const toggleComplete = async (todo) => {
    // await db.collection('todos').doc(todo.id).update({completed: !todo.completed})
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo from firebase

  const deleteTodo = async (id) => {
    // await db.collection('todos').doc(id).delete()
    await deleteDoc(doc(db, "todos", id));
  };

    const updateTodo = async (todo) => {
      navigate(`/update/${todo.id}`, {state: {todo}})
    }

  return (
    <>
      <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Todo App</h3>
          {user ? (
            <>
              {/* <button onClick={logout}>Logout</button> */}
              <form onSubmit={createTodo} className={style.form}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={style.input}
                  type="text"
                  placeholder="Add Todo"
                />
                <button className={style.button}>
                  <AiOutlinePlus size={30} />
                </button>
              </form>
            </>
          ) : (
            // <button onClick={login}>Login with Google</button>
            null
          )}
          <ul>
            {todos?.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                updateTodo = {updateTodo}
              />
            ))}
          </ul>
          {todos?.length < 1 ? null : (
            <p className={style.count}>{`You have ${todos.length} todos`}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Homepage;