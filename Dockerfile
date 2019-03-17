FROM node:10

COPY . /app
WORKDIR /app

RUN yarn install --non-interactive --no-progress --production
RUN yarn build

EXPOSE 3000
USER node

ENTRYPOINT [ "node" ]
CMD [ "server/bin/www" ]