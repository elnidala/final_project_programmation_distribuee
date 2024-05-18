// index.js
// This is the main entry file for the React application. It imports necessary modules and components,
// sets up the React application by rendering it into the DOM. It uses StrictMode for highlighting potential
// problems in an application.

import React from "react"; // Import the React library to build components.
import ReactDOM from "react-dom"; // Import ReactDOM for DOM-specific methods.
import "./index.css"; // Import the main CSS for the application, typically used to style elements globally.
import App from "./App"; // Import the App component, which is the root of the React component tree.

// Use ReactDOM.render to render the React application into the DOM.
// The application is wrapped inside React.StrictMode which helps with identifying issues in the application.
ReactDOM.render(
    <React.StrictMode>
        <div className="app-wrapper"> 
            <App /> 
        </div>
    </React.StrictMode>,
    document.getElementById("root") // The target DOM node where the React app will mount, typically found in the index.html.
);
