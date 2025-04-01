FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm i -g serve


RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]