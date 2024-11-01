#Build stage
FROM node:20.18-alpine AS build

WORKDIR /app

COPY package*.json ./ yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

#Production stage
FROM node:20.18-alpine AS production

WORKDIR /app

COPY package*.json ./
# COPY .env ./
# COPY drizzle/ ./drizzle

RUN yarn install --frozen-lockfile 
#npm ci --only=production

# Run database migrations

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./
COPY --from=build /app/drizzle/ ./drizzle
COPY --from=build /app/drizzle.config.ts ./
COPY --from=build /app/scripts ./scripts
RUN chmod +x ./scripts/run.sh

# CMD ["node", "dist/index.js"]
# Run migration and then start the server in cmd
CMD ["./scripts/run.sh"] 