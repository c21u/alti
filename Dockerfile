# =================
# Install stage
FROM node:10 as install-stage
WORKDIR /app

# Copy files needed to run yarn install.
COPY package.json .
COPY yarn.lock .

RUN yarn install --production --no-progress --non-interactive

# =================
# Build stage
FROM node:10 as build-stage
WORKDIR /app

# Copy files needed to build the app frontend.
COPY --from=install-stage /app/node_modules node_modules
COPY client client
COPY package.json .
COPY webpack.common.js .
COPY webpack.prod.js .

# Build client code.
RUN yarn build

# =================
FROM node:10-alpine as final
WORKDIR /app

COPY --from=install-stage /app/node_modules node_modules 
COPY --from=build-stage /app/dist dist 
COPY server server 
COPY package.json .

RUN echo okready

ARG app_version
ENV APP_VERSION=$app_version
ENV LOG_LEVEL=silly

EXPOSE 3000

ENTRYPOINT [ "yarn" ]
CMD [ "run", "start" ]