FROM node:10.19.0

COPY package.json /

RUN npm install

COPY . /

WORKDIR /client

COPY package.json /client/

RUN npm install

COPY . /client/

WORKDIR /server

COPY package.json /server/

RUN npm install

COPY . /server/

WORKDIR /

CMD ["npm", "start"]