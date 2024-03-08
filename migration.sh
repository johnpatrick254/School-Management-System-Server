#!/bin/sh
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init 

# Run the main container command
exec "$@"