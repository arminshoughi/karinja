FROM node:16 AS ui-build

WORKDIR /front
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]