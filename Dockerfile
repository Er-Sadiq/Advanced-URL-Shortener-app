# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the application port (replace 3000 with your app's port if different)
EXPOSE 3000

# Step 7: Set environment variables for Redis (adjust based on your setup)
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV BASE_URL=http://localhost:3000

# Step 8: Start the application
CMD ["npm", "start"]
