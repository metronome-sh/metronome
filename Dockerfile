# base node image
FROM node:20-bullseye-slim as base

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl git curl

# Install pnpm
RUN npm install -g pnpm

USER node

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN pnpm i

RUN pnpm build

CMD ["pnpm", "--filter", "@metronome/web", "start"]
