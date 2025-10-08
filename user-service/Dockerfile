FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=4002
EXPOSE 4002
CMD ["node", "src/index.js"]
