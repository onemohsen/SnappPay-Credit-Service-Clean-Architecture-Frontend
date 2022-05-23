FROM node:alpine

WORKDIR /app/frontend


COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000


CMD [ "npm","run", "serve", "--host=0.0.0.0", "--port=3000" ]