# =============================================
# Base image
# =============================================

FROM node:16 AS base

ENV YARN_CACHE /vendor/yarn

RUN mkdir -p $YARN_CACHE

WORKDIR /vendor

# Cache and install dependencies
COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/
RUN yarn install --frozen-lockfile --cache-folder $YARN_CACHE

# Create app directory
WORKDIR /app

RUN ln -s /vendor/node_modules ./node_modules

# =============================================
# Builder image
# =============================================
FROM base as builder

WORKDIR /app

COPY . .

RUN yarn run build

# =============================================
# Application image
# =============================================
FROM node:16 AS app

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json

EXPOSE 3001
CMD [ "yarn", "run", "start:migrate:prod" ]

