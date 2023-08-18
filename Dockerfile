FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=#{PORT}#
ENV JWT_SECRET=#{JWT_SECRET}#
ENV DB_HOST=#{DB_HOST}#
ENV DB_PORT=#{DB_PORT}#
ENV DB_USERNAME=#{DB_USERNAME}#
ENV DB_PASSWORD=#{DB_PASSWORD}#
ENV DB_DATABASE=#{DB_DATABASE}#

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]