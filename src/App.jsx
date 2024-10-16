import './App.css';
import './components/MuiComponents.jsx';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { CardActions, CardContent, Typography, IconButton } from '@mui/material';

// Importamos los íconos de Material-UI
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addTask = () => {
    if (title && description) {
      const newTask = { title, description, done: false }; 
      setTasks([...tasks, newTask]);

      setTitle('');
      setDescription('');
    }
  };

  const handleEdit = () => {
    if (selectedTask !== null) {
      const updatedTasks = tasks.map((task) =>
        task === selectedTask ? { ...task, title, description } : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
      setEditTask(false);
      setTitle('');
      setDescription('');
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  // Función para marcar la tarea como completada
  const toggleDoneTask = (task) => {
    const updatedTasks = tasks.map((t) =>
      t === task ? { ...t, done: !t.done } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Card>
        <Box>
          <FormControl variant="standard">
            <InputLabel htmlFor="title-input" variant="filled">
              Title
            </InputLabel>
            <Input id="title-input" type="text" value={title} onChange={handleTitleChange} />
          </FormControl>
        </Box>

        <Box>
          <FormControl variant="standard">
            <InputLabel htmlFor="description-input" variant="filled">
              Description
            </InputLabel>
            <Input id="description-input" type="text" value={description} onChange={handleDescriptionChange} />
          </FormControl>
        </Box>

        <Button onClick={addTask}>Add</Button>
      </Card>

      <h2>To Do list:</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span onClick={() => handleTaskClick(task)}>
              {task.done ? (
                <del>
                  <strong>{task.title}</strong>: {task.description}
                </del>
              ) : (
                <>
                  <strong>{task.title}</strong>: {task.description}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <Card>
          {editTask ? (
            <>
              <CardContent>
                <InputLabel htmlFor="title-edit" variant="filled">
                  Title
                </InputLabel>
                <Input id="title-edit" type="text" value={title} onChange={handleTitleChange} />

                <InputLabel htmlFor="description-edit" variant="filled">
                  Description
                </InputLabel>
                <Input id="description-edit" type="text" value={description} onChange={handleDescriptionChange} />
              </CardContent>

              <CardActions>
                <IconButton onClick={handleEdit}>
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={() => setEditTask(false)}>
                  <CloseIcon />
                </IconButton>
              </CardActions>
            </>
          ) : (
            <>
              <CardContent>
                <Typography>
                  <strong>Title: </strong>
                  {selectedTask.done ? <del>{selectedTask.title}</del> : <>{selectedTask.title}</>}
                </Typography>
                <Typography>
                  <strong>Description: </strong>
                  {selectedTask.done ? <del>{selectedTask.description}</del> : <>{selectedTask.description}</>}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => setSelectedTask(null)}>
                  <CloseIcon />
                </IconButton>
                <IconButton onClick={() => toggleDoneTask(selectedTask)}>
                  {selectedTask.done ? <UndoIcon /> : <DoneIcon />}
                </IconButton>
                <IconButton onClick={() => setEditTask(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

export default App;


