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
                    <h1>My To-Do List</h1>  // Header displaying the title of the to-do list.
                </header>
                <div className="main-content">
                    <Paper elevation={3} className="todo-container">  // Paper component used as a container with an elevation effect.
                        <form onSubmit={this.handleSubmit} className="task-form">  // Form for adding a new task.
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
                                Add Task  // Button to submit the form and add a new task.
                            </Button>
                        </form>
                        <div className="tasks-list">  // Container for the list of tasks.
                            {tasks.map((task) => (
                                <Paper key={task._id} className="task-item">  // Each task is displayed in its own Paper component.
                                    <Checkbox
                                        checked={task.completed}  // Checkbox to mark the task as completed or not.
                                        onClick={() => this.handleUpdate(task._id)}  // Handle task completion status toggle.
                                        color="primary"
                                    />
                                    <div className={task.completed ? "task-text completed" : "task-text"}>  // Text styling changes based on completion.
                                        {task.task}  // Display the task text.
                                    </div>
                                    <Button onClick={() => this.handleDelete(task._id)} color="secondary" className="delete-task-btn">
                                        Delete  // Button to delete a task.
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
