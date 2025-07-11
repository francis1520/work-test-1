# Build stage
FROM node:16.6.2 AS build

WORKDIR /app
RUN npm install -g npm@8

# Copy package files first for caching
COPY package.json package-lock.json ./
RUN npm cache clean --force && npm install --legacy-peer-deps --no-fund --no-audit --force

# Copy all project files
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
# Run the build process
RUN npm run build

# Runtime stage
FROM node:16.6.2 AS runtime

WORKDIR /app

COPY --from=build /app/build /app 

EXPOSE 3000

CMD ["npx", "serve", "-s", "/app", "-l", "3000"]