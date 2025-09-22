import { createRoot } from 'react-dom/client';
import Home from './views/Home/Home.jsx';
import NewTodo from './views/NewTodo/NewTodo.jsx';
import EditTodo from './views/EditTodo/EditTodo.jsx';
import {BrowserRouter, Routes ,Route} from 'react-router';

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/new" element={<NewTodo />}/>
        <Route path="/edit/:id" element={<EditTodo/>}/>
    </Routes>
    </BrowserRouter>  
);
