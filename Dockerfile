FROM node:lts-alpine AS base
ENV NODE_ENV=production YARN_VERSION=4.12.0

RUN apk update && apk upgrade && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

FROM base AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --immutable

ARG BUILD_FOR="prod"

COPY eslint.config.js .
COPY .babelrc.json .
COPY webpack.common.js .
COPY webpack.${BUILD_FOR}.js .
COPY client client

RUN yarn run build-${BUILD_FOR}

FROM base AS runner

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY patches patches

RUN yarn workspaces focus --production

COPY --from=builder /app/dist dist
COPY server server 

ARG app_version
ENV APP_VERSION=$app_version

EXPOSE 3000

USER node

CMD [ "yarn", "run", "start" ]
