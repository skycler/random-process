# Base stage - shared dependencies
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Test stage - run tests only with coverage
# Usage: docker build --target test -t frontend-test .
FROM base AS test

RUN npm test -- --watchAll=false --passWithNoTests --coverage --coverageReporters=text --collectCoverageFrom='src/processes/**/*.{ts,tsx}' --collectCoverageFrom='!src/processes/*.test.{ts,tsx}'

# Build stage - runs tests then builds
FROM base AS build

RUN npm run build

# Production stage
FROM nginx:alpine AS production

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
