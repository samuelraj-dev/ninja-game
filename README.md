# Project Setup Guide

Follow these steps to set up and run the project locally.

## Prerequisites

- **Node.js** (Ensure you have Node.js installed)
- **pnpm** (Package manager)

## Steps to Set Up the Repository

### Step 1: Install `pnpm`

Run the following commands to install `pnpm` globally and install dependencies:

```sh
npm install -g pnpm
pnpm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```ini
PORT=5000
MONGO_URI="<your-mongo-uri>"
SECRET_KEY="mFO8343#$QKRFNWI#" # Can be any random unguessable string
```

### Step 3: Run the Application

Start the application using:

```sh
pnpm dev
```

The application will now be running at: 
now the application is running at [http://localhost:5000](http://localhost:5000)