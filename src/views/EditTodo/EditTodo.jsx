import { useState } from 'react';
import './EditTodo.css';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import {useParams} from 'react-router';

function EditTodo() {
const {id}= useParams();

const [todoData, setTodoData]=useState({ todoItem:"", priority: "high", emoji:"🌸", isDone:false});

const loadTodo=async(id)=>{
  if (!id)return;
  const response=await axios.get(`${import.meta.env.VITE_API_URL}/todos/${id}`);

  const todoDetail=response.data.data;

  setTodoData({
    todoItem:todoDetail.todoItem,
    priority:todoDetail.priority,
    emoji:todoDetail.emoji,
    isDone:todoDetail.isDone
  });
};

useEffect(()=>{
  loadTodo(id);
},[id]);

    const [emojiPickerOpen, setEmojiPickerOpen]=useState(false);

    const updateTodo= async()=>{
      const response= await axios.put(`${import.meta.env.VITE_API_URL}/todos/${id}`,
        todoData);
      if(response){
        alert("To-Do item updated successfully");
        setTimeOut(()=>{window.location.href="/"},2000)};
    };

  return (
    <div>
     <p>
      {todoData.todoItem}
      {todoData.emoji} 
     {todoData.priority}
     </p>
     <div className='new-todo-form'>
        <h1>Editing To-Do item : {id}</h1>
     <input 
     type="text"
      value={todoData.todoItem}
      onChange={(e)=>{
        setTodoData({...todoData, todoItem: e.target.value,});
      }}/>
      
      <select value={todoData.priority} 
      onChange={(e)=>{
        setTodoData({...todoData,priority: e.target.value,});
      }}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <span onClick={()=>{
      setEmojiPickerOpen(!emojiPickerOpen);
     }}> Emoji : {todoData.emoji}</span>

     
      <EmojiPicker onEmojiClick={({emoji})=>{
        setTodoData({...todoData, emoji:emoji,});
        setEmojiPickerOpen(false);
      }}
      open={emojiPickerOpen}/>
      <button onClick={updateTodo}>Update To-Do</button>
      </div>
      </div>
  )
}
export default EditTodo
