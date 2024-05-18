// app.js
// This React component extends the 'Tasks' component to provide a UI for managing a to-do list.
// It uses Material-UI components to render a list of tasks, each with functionality to add, update, and delete tasks.

import React from "react";
import Tasks from "./Tasks";  // Importing Tasks component which likely contains logic specific to tasks handling.
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";  // Import components from Material-UI for UI design.
import "./App.css";  // Import stylesheet for styling the component.

class App extends Tasks {
    // Initialize state with an empty tasks array and a string for the current task being added.
    state = { tasks: [], currentTask: "" };

    render() {
        const { tasks, currentTask } = this.state;  // Destructure state for easier access to tasks and currentTask.

        return (
            <div className="app">
                <header className="app-header">
                    <h1>My To-Do List</h1>  
                </header>
                <div className="main-content">
                    <Paper elevation={3} className="todo-container">  
                        <form onSubmit={this.handleSubmit} className="task-form">  
                            <TextField
                                variant="outlined"  // TextField with an outlined variant.
                                size="small"  // Smaller TextField size for better UI fit.
                                className="task-input"
                                value={currentTask}  // Controlled input with currentTask as its value.
                                required={true}  // Makes the field required for submission.
                                onChange={this.handleChange}  // Handles input changes to update state.
                                placeholder="Add New TO-DO"  // Placeholder text.
                            />
                            <Button className="add-task-btn" color="primary" variant="outlined" type="submit">
                                Add Task  
                            </Button>
                        </form>
                        <div className="tasks-list">  
                            {tasks.map((task) => (
                                <Paper key={task._id} className="task-item">  
                                    <Checkbox
                                        checked={task.completed}  // Checkbox to mark the task as completed or not.
                                        onClick={() => this.handleUpdate(task._id)}  // Handle task completion status toggle.
                                        color="primary"
                                    />
                                    <div className={task.completed ? "task-text completed" : "task-text"}> 
                                        {task.task} 
                                    </div>
                                    <Button onClick={() => this.handleDelete(task._id)} color="secondary" className="delete-task-btn">
                                        Delete  
                                    </Button>
                                </Paper>
                            ))}
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default App;  // Export the component for use in other parts of the application.
