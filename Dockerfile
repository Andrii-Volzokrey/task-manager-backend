FROM node:18.12.1-bullseye
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]
