import { useState } from 'react';
import './NewTodo.css';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

function NewTodo() {

const [todoData, setTodoData]=useState({ todoItem:"", priority: "high", emoji:"🌸"});

    const [emojiPickerOpen, setEmojiPickerOpen]=useState(false);

    const addTodo= async()=>{
      const response= await axios.post(`http://localhost:3000/todos`,todoData);
      if(response){
        alert("To-Do item added successfully");
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
        <h1>New To-Do</h1>
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
      <button onClick={addTodo}>Add To-Do</button>
      </div>
      </div>
  )
}
export default NewTodo
