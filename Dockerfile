
FROM node:12.13.1

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

ARG LOCALE=""
ENV LOCALE=${LOCALE}

RUN echo "value for LOCALE: [${LOCALE}]"

# Building app
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]