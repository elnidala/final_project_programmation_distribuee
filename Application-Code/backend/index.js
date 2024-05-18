// index.js
// This is the main server file for a Node.js application using Express. It sets up the server,
// middleware, routes, and database connection, and starts listening on a specified port.

const tasks = require("./routes/tasks");  // Import the tasks router to handle task-related routes.
const connection = require("./db");       // Import the database connection setup.
const cors = require("cors");             // CORS middleware to enable cross-origin requests.
const express = require("express");       // Import the express library to create our server.
const app = express();                    // Create an instance of express.

connection();  // Initialize the database connection.

// Middleware
app.use(express.json());  // Parse JSON bodies in requests.
app.use(cors());  // Enable CORS with default settings.

// Health check route
app.get('/ok', (req, res) => {
    // Responds with 'ok' and status 200 when this route is accessed, used to check if the server is running.
    res.status(200).send('ok')
});

// Task routes
app.use("/api/tasks", tasks);  // Mount the tasks router on the '/api/tasks' path.

// Server setup
const port = process.env.PORT || 3500;  // Set the port from environment or default to 3500.
app.listen(port, () => console.log(`Listening on port ${port}...`));  // Start the server and listen on the configured port.

