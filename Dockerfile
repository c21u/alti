# ---- Build stage
FROM node:10 as builder

# Copy dependencies data from source
COPY package.json .
COPY yarn.lock .

# Install dependencies, production deps only.
RUN yarn install --production --non-interactive --no-progress

# Copy client source and build files from source.
COPY client client
COPY util util 
COPY webpack.common.js .
COPY webpack.prod.js .

# Build client code.
RUN yarn build

# ---- Release stage
FROM node:10

WORKDIR /app

# Copy server code from source.
COPY server server 

# Copy built client app and node_modules from build stage.
COPY --from=builder dist dist 
COPY --from=builder node_modules node_modules 

# The git_describe build arg should be set with `git describe`
# when docker build is run.
ARG git_describe
ENV GIT_DESCRIBE=$git_describe

EXPOSE 3000

ENTRYPOINT [ "node" ]
CMD [ "server/bin/www" ]