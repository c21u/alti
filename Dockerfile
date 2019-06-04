FROM node:10 as build-stage
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --no-progress --non-interactive

COPY client client
COPY webpack.common.js .
COPY webpack.prod.js .

RUN yarn build


FROM node:10-alpine as final
WORKDIR /app

COPY --from=build-stage /app/node_modules node_modules 
COPY --from=build-stage /app/dist dist 
COPY server server 
COPY package.json .

ARG app_version
ENV APP_VERSION=$app_version

EXPOSE 3000

USER node

ENTRYPOINT [ "yarn" ]
CMD [ "run", "start" ]