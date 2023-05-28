FROM node:14

WORKDIR /app

RUN apt-get update && \
    apt-get install -y sqlite3 bash redis-server

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN ulimit -c unlimited

CMD ["node", "--inspect", "--trace-warnings", "src/main.js"]