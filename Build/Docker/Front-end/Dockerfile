FROM node:23-alpine3.21
# Set the working directory WORKDIR
WORKDIR /app
# Copy the files that does content the list of dependencies
COPY package*.json ./ 
# Install those dependencies
RUN npm install
# Copy all files from WSL2 dist directory into app directory in the container
ADD /dist  /app
# Install npm packages RUN
RUN npm install -g http-server
# Expose port 4200 to the host machine (serve html, js)
EXPOSE 4200 
# Expose websocket port
EXPOSE 8080
# Command to run the http-server and serve the app on port 4200 
CMD ["http-server", "/app", "-p", "4200"]