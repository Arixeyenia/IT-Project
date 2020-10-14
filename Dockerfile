FROM node:10.19.0

COPY package*.json /

RUN npm install

COPY . /

WORKDIR /client

COPY package*.json /

RUN npm install

COPY . .

WORKDIR /server

COPY package*.json /

RUN npm install

COPY . .

CMD ["npm", "start"]