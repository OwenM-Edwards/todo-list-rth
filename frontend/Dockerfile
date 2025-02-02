# Use official Node.js image
FROM node:18

# Set the working directory for the application
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application files
COPY . .

# Expose the default port Vite runs on
EXPOSE 3000

# Start the Vite dev server
CMD ["yarn", "dev", "--host"]

