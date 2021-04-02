
FROM node:12.13.1

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Declaring all arg to use for env in build time
ARG LOCALE
ARG NEXT_PUBLIC_COLOR_PRIMARY
ARG NEXT_PUBLIC_COLOR_SECONDARY
ARG NEXT_PUBLIC_API_URI
ARG NEXT_PUBLIC_SITE_ID
ARG NEXT_PUBLIC_TITLE
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_CATEGORY_PARENT_ID
ARG NEXT_PUBLIC_CATEGORY_EXCEPT_IDS
ARG NEXT_PUBLIC_TIMEZONE

# Declaring env from the arg value
ENV LOCALE=${LOCALE}
ENV NEXT_PUBLIC_COLOR_PRIMARY=${NEXT_PUBLIC_COLOR_PRIMARY}
ENV NEXT_PUBLIC_COLOR_SECONDARY=${NEXT_PUBLIC_COLOR_SECONDARY}
ENV NEXT_PUBLIC_API_URI=${NEXT_PUBLIC_API_URI}
ENV NEXT_PUBLIC_SITE_ID=${NEXT_PUBLIC_SITE_ID}
ENV NEXT_PUBLIC_TITLE=${NEXT_PUBLIC_TITLE}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_CATEGORY_PARENT_ID=${NEXT_PUBLIC_CATEGORY_PARENT_ID}
ENV NEXT_PUBLIC_CATEGORY_EXCEPT_IDS=${NEXT_PUBLIC_CATEGORY_EXCEPT_IDS}
ENV NEXT_PUBLIC_TIMEZONE=${NEXT_PUBLIC_TIMEZONE}

# Building app
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]