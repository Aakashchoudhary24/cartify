FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy all files
COPY . .

# Build the app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the app in production mode
CMD ["npm", "start"]