FROM node:latest

WORKDIR /front

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
