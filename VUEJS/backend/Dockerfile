<<<<<<< HEAD

=======
# Dockerfile for backend
>>>>>>> Newway

# Use the official Node.js image as the base image
FROM node:14

<<<<<<< HEAD
# Set the working directory inside the container
=======
# Set the working directory in the container
>>>>>>> Newway
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

<<<<<<< HEAD
# Copy the rest of the files
COPY . .

# Copy .env file from the root directory
COPY ../VUEJS/.env ./

# Expose the port that your Express.js server runs on
EXPOSE 5171

# Set the default command to run your Express.js server
=======
# Copy the rest of the application code to the working directory
COPY . .

# Copy .env file to the working directory
COPY ../../../.env .     

# Expose the port on which the server will run
EXPOSE 5171

# Command to run the server
>>>>>>> Newway
CMD ["npm", "start"]
