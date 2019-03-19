# ---- Build stage
FROM node:10 as build

# Copy app directories and files required for installing.
COPY package.json .
COPY yarn.lock .

# Install dependencies, production deps only.
RUN yarn install --production --non-interactive --no-progress

# Copy app directories and files required for building.
COPY client client
COPY webpack.common.js .
COPY webpack.prod.js .

# Build client code.
RUN yarn build

# ---- Release stage
FROM node:10 as release

WORKDIR /app

# Copy remaining app directories and files.
COPY server server 
COPY --from=build dist dist 
COPY --from=build node_modules node_modules
COPY --from=build package.json .

ARG app_version=UNKNOWN
ENV APP_VERSION $app_version

EXPOSE 3000

ENTRYPOINT [ "node" ]
CMD [ "server/bin/www" ]