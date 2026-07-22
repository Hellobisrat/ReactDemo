FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.local .env.local

CMD ["npm", "start"]
