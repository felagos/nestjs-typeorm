# Stage 1: Build the Nest.js application
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./


# Install application dependencies
RUN npm i

# Copy the rest of the application source code to the container
COPY . .

# Build the Nest.js application
RUN npm run build

# Stage 2: Create a smaller production-ready image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./.env

# Expose the port your Nest.js app will listen on
EXPOSE 3000

# Start your Nest.js application
CMD ["npm", "run", "start:prod"]