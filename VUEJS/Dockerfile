#frontend/dockerfile C:\Users\h.ayari\Desktop\vueJS integration\sign\VUEJS\Dockerfile

# Use node image as base
FROM node:14
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install



# Copy .env file
COPY .env ./

# Expose port 8080
EXPOSE 8080

# Copy all files from the current directory to the container
COPY . .

# Run npm run dev as the default command
CMD ["npm", "run", "dev"]
