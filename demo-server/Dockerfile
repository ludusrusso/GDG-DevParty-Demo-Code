FROM node:12

COPY package*.json /
RUN npm install
COPY main.js /

EXPOSE 3000
CMD ["node", "main.js"]