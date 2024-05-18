# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies defined in package.json
RUN npm install

# Copy the rest of the application's code into the working directory
COPY . .

# Define the command to run the app using CMD which makes the app a default executable
CMD ["node", "index.js"]
