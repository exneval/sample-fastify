# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install app dependencies using Yarn
RUN yarn install

# Copy the rest of your application's source code to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

ENV ADDRESS=0.0.0.0 PORT=3000

# Start the Fastify application
CMD ["node", "server.js"]
