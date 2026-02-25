FROM node:lts-alpine

WORKDIR /app

COPY app/package*.json ./

RUN apk add --no-cache curl \
  && npm install --production

COPY app .

ENV PORT=3000

EXPOSE 3000

CMD ["node", "index.js"]