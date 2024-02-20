# Install dependencies only when needed
FROM node:20-bullseye-slim AS deps

WORKDIR /app
COPY package*.json ./
RUN npm i --force


# Rebuild the source code only when needed
FROM node:20-bullseye-slim AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm run build


# Production image, copy all the files and run start
FROM node:20-bullseye-slim AS runner

WORKDIR /app

ARG hostip=host.docker.internal

# Environment Variables
ENV NODE_ENV=production
ENV DATABASE_URL="mysql://root:cvmfcc@dev@${hostip}:3306/todolistahan"


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

COPY --from=builder --chown=app:nodejs /app ./

EXPOSE 3000

ENV PORT 3000

# CMD ["npm", "start"]

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm start"]