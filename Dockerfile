FROM node:14
WORKDIR /app
COPY . .
RUN rm /etc/localtime && ln -s /usr/share/zoneinfo/Europe/Kiev /etc/localtime
RUN npm install && npm run lint-fix && npm run build
CMD ["npm", "run", "start"]
