FROM node:10.19.0

WORKDIR /client

COPY package.json /client/

RUN npm install

COPY . /client/

WORKDIR /server

COPY package.json /server/

RUN npm install

COPY . /server/

EXPOSE 3000

CMD ["npm", "start"]