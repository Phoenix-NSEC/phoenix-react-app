FROM node:16

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN cd ./ && npm install

COPY ./ ./

EXPOSE 3000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]