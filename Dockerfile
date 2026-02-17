FROM node:lts-alpine AS builder
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --no-progress --non-interactive

ARG BUILD_FOR="prod"

COPY eslint.config.js .
COPY .babelrc.json .
COPY webpack.common.js .
COPY webpack.${BUILD_FOR}.js .
COPY client client

RUN yarn run build-${BUILD_FOR}

FROM node:lts-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --no-progress --non-interactive

COPY --from=builder /app/dist dist
COPY server server 

ARG app_version
ENV APP_VERSION=$app_version

EXPOSE 3000

USER node

CMD [ "yarn", "run", "start" ]
