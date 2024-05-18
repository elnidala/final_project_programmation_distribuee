// Tasks.js
// This component handles the task management logic in a React application, including
// fetching tasks from the server, adding new tasks, updating task completion status, and deleting tasks.

import { Component } from "react";
import {
    addTask,      // Function to add a new task to the server.
    getTasks,     // Function to fetch all tasks from the server.
    updateTask,   // Function to update a task on the server.
    deleteTask,   // Function to delete a task from the server.
} from "./services/taskServices";  // Import service functions handling API requests.

class Tasks extends Component {
    state = { tasks: [], currentTask: "" };  // Initializes the state with an empty task list and a string for the current task input.

    async componentDidMount() {
        // Lifecycle method that runs after the component mounts. Used here to fetch tasks.
        try {
            const { data } = await getTasks();  // Attempt to fetch tasks and store them in state.
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);  // Log errors if the fetch fails.
        }
    }

    handleChange = ({ currentTarget: input }) => {
        // Handles changes to the input field for new tasks.
        this.setState({ currentTask: input.value });  // Updates the currentTask in state with the new input value.
    };

    handleSubmit = async (e) => {
        // Handles submission of the new task form.
        e.preventDefault();
        const originalTasks = this.state.tasks;  // Store the original task list in case of an error.
        try {
            const { data } = await addTask({ task: this.state.currentTask });  // Add the new task via API.
            const tasks = originalTasks;
            tasks.push(data);  // Add the new task to the local task list.
            this.setState({ tasks, currentTask: "" });  // Update the state with the new list and reset currentTask.
        } catch (error) {
            console.log(error);  // Log errors and revert to original tasks if the API call fails.
        }
    };

    handleUpdate = async (currentTaskId) => {
        // Handles toggling the completion status of a task.
        const originalTasks = this.state.tasks;  // Store the original tasks in case of an error.
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTaskId);  // Find the task by ID.
            tasks[index] = { ...tasks[index], completed: !tasks[index].completed };  // Toggle the completed status.
            this.setState({ tasks });
            await updateTask(currentTaskId, { completed: tasks[index].completed });  // Update the task on the server.
        } catch (error) {
            this.setState({ tasks: originalTasks });  // Revert to original tasks if there's an error.
            console.log(error);
        }
    };

    handleDelete = async (currentTaskId) => {
        // Handles the deletion of a task.
        const originalTasks = this.state.tasks;  // Store the original tasks in case of an error.
        try {
            const tasks = originalTasks.filter((task) => task._id !== currentTaskId);  // Remove the task from the list.
            this.setState({ tasks });
            await deleteTask(currentTaskId);  // Delete the task on the server.
        } catch (error) {
            this.setState({ tasks: originalTasks });  // Revert to original tasks if there's an error.
            console.log(error);
        }
    };
}

export default Tasks;  // Export the Tasks component for use in other parts of the application.
