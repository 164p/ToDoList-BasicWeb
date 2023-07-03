import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ToDoList from './ToDoList/ToDoList'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
        <Routes>
            <Route 
              path="/" 
              element={<ToDoList />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
