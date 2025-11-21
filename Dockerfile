# Multi-stage build: Build frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY frontend/ ./

# Build the app
RUN npm run build

# Production stage: Serve with Nginx
FROM nginx:alpine

# Copy built frontend from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80