# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /front-build

# Copies package.json and package-lock.json to Docker environment
# Install `serve` to run the application.
RUN npm install -g serve



# Copies everything needed over to Docker environment
COPY ./build /front-build/build


#Docker ENV
ENV HTTP_PORT=4000
# Uses port which is used by the actual application
EXPOSE $HTTP_PORT

# Run application
#CMD [ "npm", "start" ]
CMD serve -s build -l $HTTP_PORT