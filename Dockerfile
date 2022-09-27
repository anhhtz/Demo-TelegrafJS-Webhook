FROM node:16-alpine3.14


# ADD package.json /tmp/package.json
COPY package*.json /tmp/
RUN cd /tmp && npm ci --only=production
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/


WORKDIR /opt/app
ADD . /opt/app


EXPOSE 8000
CMD [ "node", "server.js" ]