import "./Home.css";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router";
import deleteButton from './delete.png';
import imgEdit from './edit.png';

function Home() {
  const [todos, setTodos]=useState([]);

  const loadTodos = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
    // it is async request that runs in the background[lect131-26:01min]
setTodos(response.data.data);
  };//u can use await keyword only when async is used 29:31min

  useEffect(()=>{
    loadTodos();
  }, [])

const deleteTodo=async(id)=>{
  const response= await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
  if(response){
    alert("To-Do item deleted successfully");
    loadTodos();
  }
};
const markTodoDone=async (id, isDone)=>{
  const response= await axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}/status`, {isDone});
if(response){
  alert("To-Do status updated successfully");
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
          <input type="checkbox" checked={isDone} onChange={(e)=>{
            markTodoDone(id, e.target.checked)
          }}/>
          <div className="todo-icon">{emoji}</div> 
          <div> <h2 className={`todo-detail ${isDone ? "todo-done" : ""}`}> {todoItem }</h2> </div>
          <span className="todo-created-at">{createdAt.replace("T", " ").slice(0,16)}</span>
          <img src={deleteButton} className="todo-delete-icon" alt="Delete"  onClick={()=>{
            deleteTodo(id);
          }}/>
          <Link to={`/edit/${id}`}>
           <img src={imgEdit} className="todo-edit-icon" alt="Edit"  onClick={()=>{
            deleteTodo(id);
          }}/>
          </Link>
         </div>
          )
        })
     }
<Link to="/new" className="fab"> New To-Do</Link>
    </div>
  )
}
export default Home
