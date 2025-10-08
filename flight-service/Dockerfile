# Use Node 22
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port your service uses
ENV PORT=4001
EXPOSE 4001

# Start the service
CMD ["node", "src/index.js"]
