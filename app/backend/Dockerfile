FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
RUN npm install && npm run build
ENTRYPOINT ["npm", "start"]