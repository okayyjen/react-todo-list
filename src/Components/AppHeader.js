import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TodoModal from './TodoModal';
import TodoList from './TodoList';
function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>
        <Button variant = "contained" color = "success" onClick={() => setModalOpen(true)}>Add Task</Button>
        <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <TodoList /> 

        
    </div>
  )
}

export default AppHeader