import React, { useState,useRef } from "react";
import axios from "axios";
// import { CHECK_TODO,REMOVE_TODO, UPDATE_TODO} from "../utils/constants";


const TodoItem = ({ id, title, checked, dispatch}) => {
  const updatedTitle=useRef(null);
  const handleCheckbox = async (e) => {
    const value = e.target.checked;
    console.log(value,"value")
    const checkTodoReq = await axios({
      method: "PUT",
      url: "http://training.virash.in/todos/minakshee",
      data: {
        id: id,
        checked: value,
      },
      headers: {
        "Content-Type": "application/json; Charset=UTF-8",
      },
    });

    if (checkTodoReq.data.message === "Todo Updated Successfully!") {
      dispatch({ type: 'CHECK_TODO', payload: { id, value } });
    } else {
      alert("Todo Not Updated Some Error In API Call");
    }
  };

  const removeItem=async (e)=>
  {
    const removeTodo= await axios({
      method:"delete",
      url:"http://training.virash.in/todos/minakshee",
      data:{
        id:id,
      },
      headers: {
        "Content-Type": "application/json; Charset=UTF-8",
      },
    });
    if (removeTodo.data.message === "Todo Deleted Successfully!") {
      dispatch({ type: 'REMOVE_TODO', payload: {id} });
    } else {
      alert("Todo Not Removed Some Error In API Call");
    }
  };

  const updateTitle=async (e)=>
  {
    const updateTodo= await axios({
      method:"POST",
      url:"http://training.virash.in/todos/updateTodo/minakshee",
      data:{
        id:id,
        title:updatedTitle.current.value
      },
      headers: {
        "Content-Type": "application/json; Charset=UTF-8",
      },
    });
    if (updateTodo.data.message === "Todo Updated Successfully!") {
      dispatch({ type: 'UPDATE_TODO', payload: {id:id,title:updatedTitle.current.value} });
    } else {
      alert("Todo Not Updated Some Error In API Call");
    }
  };

  return (
    <div>
      <input type="checkbox" defaultValue={checked} onChange={handleCheckbox}/>
      <input type="text" defaultValue={title} ref={updatedTitle} placeholder="Enter Todo.." className="updatedInput"/>      
      <button onClick={removeItem} className="removeTodo">Remove</button>
      <button className="updateTodo" onClick={updateTitle}>Update</button>
    </div>
  );
};

export default TodoItem;
