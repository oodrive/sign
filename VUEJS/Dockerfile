# Use node image as base
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose port 5173
EXPOSE 5173

# Copy all frontend files to the working directory
COPY . .

# Run npm run dev as the default command
CMD ["npm", "run", "dev"]
