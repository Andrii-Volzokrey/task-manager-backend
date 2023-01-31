## DEVELOPMENT ##
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
USER node

## PRODUCTION ##
FROM node:18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=development --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=development --chown=node:node /usr/src/app/dist ./dist
USER node
CMD [ "node", "dist/main" ]
