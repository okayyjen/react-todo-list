import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';


function TodoModal({ modalOpen, setModalOpen }) {
    const [allTask, setAllTask] = useState(()=> {
        const savedTask = localStorage.getItem("allTask");
        if(savedTask){
            return JSON.parse(savedTask);

        }
        else{
            return [];
        }
    });
    const [task, setTask] = useState('');

    useEffect(() => {
        localStorage.setItem("allTask", JSON.stringify(allTask))
    }, [allTask]);


    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log({task});
        if(task!==""){
            setAllTask([
                ...allTask,
                {
                    id: uuidv4(),
                    text: task.trim()
                }
            ]);
        }
        setTask("");
        window.location.reload();
    }
    return (
        modalOpen && (
            <div>
                <Dialog open={modalOpen} onClose ={() => setModalOpen(false)}>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="task"
                            label="task"
                            type="text"
                            fullWidth
                            variant="standard"
                            value = {task}
                            onChange={(e) => setTask(e.target.value)}

                        />
                        <Button type="submit">Add Task</Button>
                        <Button onClick={() => setModalOpen(false)}>Close</Button>
                    </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
  )
}

export default TodoModal