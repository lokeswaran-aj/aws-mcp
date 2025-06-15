FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@10.11.1

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY tsconfig*.json ./

COPY src/ ./src/

RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "start"] 