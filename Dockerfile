FROM node:18-alpine
WORKDIR /app
COPY index.js ./
COPY test.js ./
COPY package*.json ./
RUN npm ci || npm i
