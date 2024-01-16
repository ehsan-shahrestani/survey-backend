# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Install PM2 globally
RUN npm install -g pm2


# Start the app using PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]