<<<<<<< HEAD
#frontend/dockerfile C:\Users\h.ayari\Desktop\vueJS integration\sign\VUEJS\Dockerfile

# Use node image as base
FROM node:14
=======
# Use node image as base
FROM node:14

>>>>>>> Newway
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
<<<<<<< HEAD
# Install dependencies
RUN npm install



# Copy .env file
COPY .env ./

# Expose port 8080
EXPOSE 8080

# Copy all files from the current directory to the container
=======

# Install dependencies
RUN npm install

# Expose port 5173
EXPOSE 5173

# Copy all frontend files to the working directory
>>>>>>> Newway
COPY . .

# Run npm run dev as the default command
CMD ["npm", "run", "dev"]
