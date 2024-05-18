// task.js
// This module defines the schema for a "task" document using Mongoose, which will be used in MongoDB.
// It also exports the model for the task, making it available for CRUD operations elsewhere in the application.

const mongoose = require("mongoose");  // Import mongoose to interact with MongoDB.

// Define the schema for a task using Mongoose's Schema constructor.
const taskSchema = new Schema({
    task: {
        type: String,        // Specifies the type of the 'task' field as String.
        required: true,      // Makes the 'task' field mandatory.
    },
    completed: {
        type: Boolean,       // Specifies the type of the 'completed' field as Boolean.
        default: false,      // Sets the default value of 'completed' to false.
    },
});

// Export the model
// Creates a model named 'task' using the taskSchema. This model will interface with the 'tasks' collection in MongoDB.
module.exports = mongoose.model("task", taskSchema);
