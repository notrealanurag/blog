#!/bin/sh

while ! nc -z $DB_HOST $DB_PORT; do
    echo "Waiting for database to be ready..."
    sleep 2
done

echo "Database is ready!"

# Run migrations
echo "Running migrations..."
pnpm migration:run

# Run seeds
if [ "$SEED_DATABASE" = "true" ]; then
    echo "Running seeds..."
    pnpm seed
fi

# Start the application
echo "Starting the application..."
exec node dist/src/main
