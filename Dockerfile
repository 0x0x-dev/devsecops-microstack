FROM node:22-alpine
# Use the official Node.js image as a base
# Alpine version is lightweight and suitable for production
WORKDIR /app
# Set the working directory inside the container
COPY package*.json ./
# Copy package.json and package-lock.json to the working directory
RUN npm install --production
# Install only production dependencies to keep the image size small
COPY . .
# Copy the rest of the application code to the working directory
EXPOSE 3000
# Expose port 3000 for the application
USER node
# Run the application as a non-root user for security
CMD ["node", "index.js"]
# Start the application using server.js
