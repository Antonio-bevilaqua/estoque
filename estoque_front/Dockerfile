FROM node:22 as builder

WORKDIR /var/www/araxa_cre_frontend

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm install && npm run build && npm run start"]