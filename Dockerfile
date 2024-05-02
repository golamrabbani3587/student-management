FROM node:20.12.1

RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]