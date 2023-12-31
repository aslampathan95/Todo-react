import React, { useEffect, useState, useReducer } from "react";
// import {SET_TODOS,ADD_TODO,REMOVE_TODO,CLEAR_TODOS,CHECK_TODO,UPDATE_TODO,} from "../utils/constants";
import axios from "axios";
import Loading from "./Loading";
import TodoItem from "./TodoItem";
import "./todo.css";


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload.data;
    case 'ADD_TODO':
      const newTodo = action.payload.newTodo;
      var arr1 = [...state];
      arr1.push(newTodo);
      return arr1;
    case 'CHECK_TODO':
      const id = action.payload.id;
      const value = action.payload.value;
      var arr2 = [...state];
      arr2[arr2.findIndex((el) => el.id === id)].checked = value;
      return arr2;
    case 'REMOVE_TODO':
      const Id= action.payload.id;
      var arr3 = [...state];
      var arr4=arr3.filter((el) => el.id !== Id);
      return arr4;
    case 'CLEAR_TODOS':
      return [];
    case 'UPDATE_TODO':
      const updateId=action.payload.id;
      const updateTitle=action.payload.title;
      var arr5 =[...state];
      arr5[arr5.findIndex((el)=>el.id===updateId)].title=updateTitle;
      return arr5;
    default:
      return state;
  }
};

const Todo = () => {
  const [loading, setLoading] = useState(false);
  const [todoInput, setTodoInput] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchFunc = async () => {
      setLoading(true);
      const todosData = await axios({
        method: "GET",
        url: "http://training.virash.in/todos/minakshee",
        headers: {
          "Content-Type": "application/json; Charset=UTF-8",
        },
      });
      setLoading(false);
      dispatch({ type: 'SET_TODOS', payload: { data: todosData.data } });
    };
    fetchFunc();
  }, []);

  const addTodo = async () => {
    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: todoInput,
      checked: false,
    };
    const addTodoReq = await axios({
      method: "POST",
      url: "http://training.virash.in/todos/minakshee",
      data: newTodo,
      headers: {
        "Content-Type": "application/json; Charset=UTF-8",
      },
    });

    if (addTodoReq.data.message === "Todo Added Successfully!") {
      dispatch({ type: 'ADD_TODO', payload: { newTodo } });
    } else {
      alert("Todo Not Added Some Error In API Call");
    }
  };

  const clearTodo = async () => {
      const clear = await axios({
      method: "GET",
      url: "http://training.virash.in/clear/minakshee",
      headers: {
        "Content-Type": "application/json; Charset=UTF-8",
      },
    });
    if (clear.data.message === "Todos Cleared!") {
      dispatch({ type: 'CLEAR_TODOS'});
    } else {
      alert("Todo Not cleared Some Error In API Call");
    }
    
  };


  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
      {JSON.stringify(todos.length)}
        <h1>TODO List</h1>
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Enter Todo.."
          className="todoInput"
        /><br/>
        <button onClick={addTodo} className="addTodo">Add Todo</button>
        <button onClick={clearTodo} className="clearTodo">Clear Todo</button>
        <ul>
          {todos.map((val) => (
            <TodoItem
              key={val.id}
              id={val.id}
              title={val.title}
              checked={val.checked}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </div>
    );
  }
}
export default Todo;
