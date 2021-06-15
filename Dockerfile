
FROM node:12.13.1

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Declaring all arg to use for env in build time
ARG NODE_ENV


# Declaring env from the arg value
ENV NODE_ENV=${NODE_ENV}

# Building app
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]