FROM node:10
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --no-progress --non-interactive

COPY webpack.common.js .
COPY webpack.prod.js .
COPY client client
COPY server server 

RUN yarn run build

ARG app_version
ENV APP_VERSION=$app_version

EXPOSE 3000

USER node

ENTRYPOINT [ "yarn" ]
CMD [ "run", "start" ]