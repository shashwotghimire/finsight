# build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY app/api/v1/package*.json ./
RUN npm install
COPY ./app/api/v1 .
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

# prod stage
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY app/api/v1/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]
