FROM node:alpine

RUN apk add git

WORKDIR /app

# Copy app directories and files.
COPY client client
COPY server server 
COPY package.json .
COPY webpack.common.js .
COPY webpack.prod.js .
COPY yarn.lock .

# Install dependencies, production deps only.
RUN yarn install --production --non-interactive --no-progress

# Build client code.
RUN yarn build

ARG app_version
ENV APP_VERSION=$app_version

EXPOSE 3000

ENTRYPOINT [ "node" ]
CMD [ "server/bin/www" ]