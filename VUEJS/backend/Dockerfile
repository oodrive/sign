

# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Copy .env file from the root directory
COPY ../VUEJS/.env ./

# Expose the port that your Express.js server runs on
EXPOSE 5171

# Set the default command to run your Express.js server
CMD ["npm", "start"]
