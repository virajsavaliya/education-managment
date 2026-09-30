FROM node:20-alpine


WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose Next.js port
EXPOSE 3000

# Start script: run prisma db push, seed the database, and start Next.js development server
CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && npx next dev -H 0.0.0.0"]
