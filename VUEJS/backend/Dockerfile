# Dockerfile for backend
# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy .env file to the working directory
COPY ../../../.env .     

# Expose the port on which the server will run
EXPOSE 5171

# Command to run the server
CMD ["npm", "start"]
