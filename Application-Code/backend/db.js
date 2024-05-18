// db.js
// This module sets up the MongoDB connection using Mongoose. It dynamically configures
// connection parameters based on environment variables and attempts to establish a
// database connection. Logs are provided to indicate the success or failure of the connection.

const mongoose = require("mongoose"); // Import mongoose to handle database operations.

/**
 * Establishes a connection to MongoDB using parameters from environment variables.
 * Supports optional database authentication.
 * @async
 * @function connectToDatabase
 * @returns {Promise<void>} A promise that resolves when the connection is successful or rejects on error.
 */
module.exports = async () => {
    try {
        // Default connection parameters for MongoDB
        const connectionParams = {
            useNewUrlParser: true, // Use the new URL parser for MongoDB connections.
            useUnifiedTopology: true, // Enables the new Server Discover and Monitoring engine.
            // Previous options like `useCreateIndex` are commented out as they might be deprecated or unused.
        };

        // Check if database authentication is enabled through environment variables
        const useDBAuth = process.env.USE_DB_AUTH || false;
        if (useDBAuth) {
            connectionParams.user = process.env.MONGO_USERNAME; // MongoDB username from environment variable.
            connectionParams.pass = process.env.MONGO_PASSWORD; // MongoDB password from environment variable.
        }

        // Connect to MongoDB using the connection string and parameters from environment variables
        await mongoose.connect(
            process.env.MONGO_CONN_STR, // MongoDB connection string from environment variable.
            connectionParams
        );
        console.log("Connected to database."); // Log on successful connection.
    } catch (error) {
        // Catch and log any errors during the connection attempt.
        console.log("Could not connect to database.", error);
    }
};
