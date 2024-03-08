FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine AS runner

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma/

EXPOSE 3000
CMD [ "npm", "run", "start:migrate:prod" ]