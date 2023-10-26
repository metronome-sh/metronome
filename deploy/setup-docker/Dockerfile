FROM node:20-bullseye-slim as base

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl git curl

# Install pnpm
RUN npm install -g pnpm

WORKDIR /home/node/app

COPY . .

RUN pnpm i

RUN pnpm build

RUN pnpm geoip:download

CMD ["pnpm", "--filter", "@metronome/web", "start"]
