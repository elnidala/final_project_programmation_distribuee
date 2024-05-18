// taskServices.js
// This module provides utility functions for interacting with the task-related API endpoints.
// It uses axios for making HTTP requests to perform CRUD operations on tasks.

import axios from "axios"; // Import axios to handle HTTP requests.

// Set the base API URL from environment variables or use a default value for development.
const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/tasks";
console.log(apiUrl); // Log the API URL to debug or verify the correct endpoint.

/**
 * Fetches the list of tasks from the server.
 * @returns {Promise} A promise that resolves with the response of the GET request.
 */
export function getTasks() {
    return axios.get(apiUrl); // Make a GET request to the specified API URL to retrieve tasks.
}

/**
 * Adds a new task to the server.
 * @param {Object} task - The task object to add. Should include necessary task details.
 * @returns {Promise} A promise that resolves with the response of the POST request.
 */
export function addTask(task) {
    return axios.post(apiUrl, task); // Make a POST request to the API URL to create a new task.
}

/**
 * Updates an existing task on the server.
 * @param {string} id - The ID of the task to update.
 * @param {Object} task - The updated task data.
 * @returns {Promise} A promise that resolves with the response of the PUT request.
 */
export function updateTask(id, task) {
    return axios.put(`${apiUrl}/${id}`, task); // Make a PUT request to update the task at the specified ID.
}

/**
 * Deletes a task from the server.
 * @param {string} id - The ID of the task to be deleted.
 * @returns {Promise} A promise that resolves with the response of the DELETE request.
 */
export function deleteTask(id) {
    return axios.delete(`${apiUrl}/${id}`); // Make a DELETE request to remove the task at the specified ID.
}
