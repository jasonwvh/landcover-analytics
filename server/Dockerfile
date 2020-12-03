# Dockerfile for Node server

# Build react client
FROM node:14.15.1

# Create app directory
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]