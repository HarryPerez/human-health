FROM node:latest

WORKDIR /back

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start-dev"]