FROM node:23-alpine3.21
# Set the working directory WORKDIR
WORKDIR /app
# Copy all files from WSL2 dist directory into app directory in the container
ADD /dist  app
# open port 3000; docker run -p 3000:3000 your-image-name
EXPOSE 3000
# start the server
CMD [ "node", "main.js" ]