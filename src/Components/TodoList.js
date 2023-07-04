import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoList() {
    const[allTask, setTasks] = useState([]);
    useEffect(() => {
        const stored = localStorage.getItem('allTask');
        console.log(stored);
        if(stored){
            try {
                const parsedTasks = JSON.parse(stored);
                setTasks(parsedTasks);
            } catch(error) {
                console.error("error parsing stored tasks", error);
            }
        }
    }, []);

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleDelete = () => {
        localStorage.removeItem("allTask");
        window.location.reload();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {allTask.map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;

                    return (
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText key={labelId} primary={`${value.text}`} />
                        </ListItemButton>
                    );
                })}
            </List>
            <Button variant="outlined" onClick={() => handleDelete()} startIcon={<DeleteIcon />} >
                Delete List
            </Button>
        </div>
    );
}
export default TodoList