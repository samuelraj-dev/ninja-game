Steps to setup the repo:

Step 1: (Installing pnpm package manager)

Run the following commands:

npm install -g pnpm
pnpm install

Step 2: (Environmental Variables)

Create .env file in the root of the project, and add the following variables:

PORT=5000
MONGO_URI="<your-mongo-uri>"
SECRET_KEY="mFO8343#$QKRFNWI#" # Can be any random unguessable string

Step 3: (Run the application)

Run the following command:

pnpm dev

now the application is running at http://localhost:5000