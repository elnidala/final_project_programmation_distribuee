# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory to /usr/src/app inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies specified in package.json
RUN npm install

# Copy all other files from the project directory to the container's working directory
COPY . .

# Command to run the application using npm's start script
CMD ["npm", "start"]
