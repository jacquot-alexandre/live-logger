FROM node:23-alpine3.21
# Set the working directory WORKDIR
WORKDIR /app
# Copy the files that does content the list of dependencies
COPY package*.json ./ 
# Install those dependencies
RUN npm install
# Copy all files from WSL2 dist directory into app directory in the container
ADD /dist  /app
# Open port 3000; docker run -p 3000:3000 your-image-name
EXPOSE 3000
# Start the server
CMD [ "node", "main.js" ]