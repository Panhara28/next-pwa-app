
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
ARG LOCALE
ARG APOLLO_CLIENT_NAME
ARG NEXT_PUBLIC_COLOR_PRIMARY
ARG NEXT_PUBLIC_COLOR_SECONDARY
ARG NEXT_PUBLIC_API_URI
ARG NEXT_PUBLIC_SITE_ID
ARG NEXT_PUBLIC_TITLE
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_ASSET_URL
ARG NEXT_PUBLIC_TELEGRAM
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_ADS_ZONE_ONE
ARG NEXT_PUBLIC_ADS_ZONE_TWO
ARG NEXT_PUBLIC_ADS_ZONE_THREE
ARG NEXT_PUBLIC_CATEGORY_PARENT_ID
ARG NEXT_PUBLIC_CATEGORY_EXCEPT_IDS
ARG NEXT_PUBLIC_TIMEZONE

# Declaring env from the arg value
ENV NODE_ENV=${NODE_ENV}
ENV LOCALE=${LOCALE}
ENV APOLLO_CLIENT_NAME=${APOLLO_CLIENT_NAME}
ENV NEXT_PUBLIC_COLOR_PRIMARY=${NEXT_PUBLIC_COLOR_PRIMARY}
ENV NEXT_PUBLIC_COLOR_SECONDARY=${NEXT_PUBLIC_COLOR_SECONDARY}
ENV NEXT_PUBLIC_API_URI=${NEXT_PUBLIC_API_URI}
ENV NEXT_PUBLIC_SITE_ID=${NEXT_PUBLIC_SITE_ID}
ENV NEXT_PUBLIC_TITLE=${NEXT_PUBLIC_TITLE}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_ASSET_URL=${NEXT_PUBLIC_ASSET_URL}
ENV NEXT_PUBLIC_TELEGRAM=${NEXT_PUBLIC_TELEGRAM}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_ADS_ZONE_ONE=${NEXT_PUBLIC_ADS_ZONE_ONE}
ENV NEXT_PUBLIC_ADS_ZONE_TWO=${NEXT_PUBLIC_ADS_ZONE_TWO}
ENV NEXT_PUBLIC_ADS_ZONE_THREE=${NEXT_PUBLIC_ADS_ZONE_THREE}
ENV NEXT_PUBLIC_CATEGORY_PARENT_ID=${NEXT_PUBLIC_CATEGORY_PARENT_ID}
ENV NEXT_PUBLIC_CATEGORY_EXCEPT_IDS=${NEXT_PUBLIC_CATEGORY_EXCEPT_IDS}
ENV NEXT_PUBLIC_TIMEZONE=${NEXT_PUBLIC_TIMEZONE}

# Building app
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]