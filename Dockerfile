FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./.env /app/
# COPY ./yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn build

FROM nginx:1.17.8-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
EXPOSE $PORT

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

