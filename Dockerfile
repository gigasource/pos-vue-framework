FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm set unsafe-perm true
RUN npm ci
COPY . .
EXPOSE 6006
CMD ["npm", "run", "storybook"]
