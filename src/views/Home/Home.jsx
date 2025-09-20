import "./Home.css";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router";

function Home() {
  const [todos, setTodos]=useState([]);

  const loadTodos = async ()=>{
    const response = await axios.get("http://localhost:3000/todos");
    // it is async request that runs in the background[lect131-26:01min]
setTodos(response.data.data);
  };//u can use await keyword only when async is used 29:31min

  useEffect(()=>{
    loadTodos();
  }, [])

const deleteTodo=async(id)=>{
  const response= await axios.delete("http://localhost:3000/todos/id");
  if(response){
    alert(response.data.message);
    loadTodos();
  }
};

  return (
    <div>
      <h1> React To-Do </h1>
      {
        todos.map((todoObj)=>{
          const {id, todoItem, priority, emoji, isDone ,createdAt}= todoObj;
          return (
          <div key={id} className="todo-card"> 
          <span className={"todo-priority"}>{priority}</span>
          <div className="todo-icon">{emoji}</div> 
          <div> <h2 className={`todo-detail ${isDone ? "todo-done" : ""}`}> {todoItem }</h2> </div>
          <span className="todo-created-at">{createdAt.replace("T", " ").slice(0,16)}</span>
          <button onClick={()=>{
            deleteTodo(id);
          }}>Delete Now</button>
         </div>
          )
        })
     }
<Link to="/new" className="fab"> New To-Do</Link>
    </div>
  )
}
export default Home
