FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm set unsafe-perm true
RUN npm install
COPY . .
RUN npm install -g http-server
RUN npm run build
EXPOSE 8080
CMD ["http-server", "dist"]
