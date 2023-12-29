# Stage 1: Build the frontend
FROM node:20 as frontend-build
ENV NODE_ENV=production
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:20 as backend-build
ENV NODE_ENV=production
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Stage 3: Setup the production environment
FROM node:20
ENV NODE_ENV=production
WORKDIR /app
COPY --from=backend-build /app/dist ./dist
COPY --from=frontend-build /app/dist ./dist/public
COPY backend/package*.json ./
RUN npm install

# Command to run the app
CMD ["node", "dist/index.js"]
