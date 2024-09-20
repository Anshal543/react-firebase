import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const style = {
  container: `max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  form: `flex flex-col`,
  input: `border p-2 text-xl`,
  button: `border p-4 mt-4 bg-purple-500 text-white`,
  cancelButton: `border p-4 mt-4 bg-gray-500 text-white`,
};

const UpdateTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const todo = location.state.todo;
  const [updatedText, setUpdatedText] = useState(todo.text);

  // Handle updating the todo
  const updateTodo = async (e) => {
    e.preventDefault();
    if (!updatedText) return;
    await updateDoc(doc(db, "todos", todo.id), {
      text: updatedText,
    });
    navigate("/");
  };

 
  const cancelUpdate = () => {
    navigate("/"); 
  };

  return (
    <div className={style.container}>
      <h3 className="text-3xl font-bold text-center text-gray-800">Update Todo</h3>
      <form onSubmit={updateTodo} className={style.form}>
        <input
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className={style.input}
          type="text"
        />
        <button className={style.button} type="submit">Update Todo</button>
      </form>
      <button className={style.cancelButton} onClick={cancelUpdate}>
        Cancel
      </button>
    </div>
  );
};

export default UpdateTodo;
