FROM node:22 as builder

WORKDIR /var/www/estoque_frontend

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3100

CMD ["npm", "run", "start"]