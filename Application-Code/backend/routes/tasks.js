// tasks.js
// This module defines the router for handling CRUD operations on task documents.
// It leverages the Task model to interact with the MongoDB database using Mongoose.
// The routes defined here include operations to create, retrieve, update, and delete tasks.
// Each route is equipped with error handling to respond appropriately to client requests.

const Task = require("../models/task");  // Import the Task model for database operations.
const express = require("express");      // Import Express to create router.
const router = express.Router();         // Create a new router to handle routes for tasks.

/**
 * POST endpoint to create a new task.
 * This endpoint will save a new task to the database based on the JSON payload in the request body.
 * @route POST /
 * @returns {Object} task - The newly created task document.
 * @returns {Object} error - Error object if the operation fails.
 */
router.post("/", async (req, res) => {
    try {
        const task = await new Task(req.body).save();  // Create and save a new task.
        res.send(task);  // Respond with the newly created task.
    } catch (error) {
        res.status(400).send(error);  // Respond with error if task creation fails.
    }
});

/**
 * GET endpoint to retrieve all tasks.
 * This endpoint retrieves all task documents from the database.
 * @route GET /
 * @returns {Array} tasks - An array of task documents.
 * @returns {Object} error - Error object if the operation fails.
 */
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();  // Retrieve all tasks from the database.
        res.send(tasks);  // Respond with the array of tasks.
    } catch (error) {
        res.status(500).send(error);  // Respond with error if retrieval fails.
    }
});

/**
 * PUT endpoint to update an existing task.
 * This endpoint updates a task based on the provided task ID and the JSON payload in the request body.
 * @param {string} id - The ID of the task to update.
 * @route PUT /:id
 * @returns {Object} task - The updated task document.
 * @returns {Object} error - Error object if the operation fails.
 */
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },  // Specify the task to update using the ID.
            req.body,                // Apply updates from the request body.
            { new: true }            // Return the updated document.
        );
        res.send(task);  // Respond with the updated task.
    } catch (error) {
        res.status(404).send(error);  // Respond with error if the task is not found.
    }
});

/**
 * DELETE endpoint to remove a task.
 * This endpoint deletes a task based on the provided task ID.
 * @param {string} id - The ID of the task to delete.
 * @route DELETE /:id
 * @returns {Object} task - The deleted task document, if found.
 * @returns {Object} error - Error object if the operation fails.
 */
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);  // Delete the specified task.
        res.send(task);  // Respond with the deleted task document.
    } catch (error) {
        res.status(404).send(error);  // Respond with error if the task is not found.
    }
});

module.exports = router;  // Export the router to be mounted by the main application.
