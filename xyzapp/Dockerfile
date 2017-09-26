# Create image based off of the official Node 6 image
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# use nodemon for development
# RUN npm install --global nodemon

RUN apt-get update 
#RUN apt-get install -y mongodb-org
    #for aws 
RUN apt-get install -y mongodb-org git python build-essential curl
RUN service mongod start

RUN mkdir -p /data/db

# Change directory so that our commands run inside this new dir
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
