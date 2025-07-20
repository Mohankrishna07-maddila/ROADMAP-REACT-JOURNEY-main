#!/bin/bash

echo "🚀 Setting up CareerPath Backend..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) and npm $(npm -v) are installed"

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file from config.env
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp config.env .env
    echo "✅ .env file created from config.env"
    echo "⚠️  Please update the .env file with your configuration"
else
    echo "✅ .env file already exists"
fi

# Check if MongoDB is running (optional check)
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.runCommand('ping')" &> /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB might not be running. Please start MongoDB before running the application."
    fi
else
    echo "⚠️  MongoDB client not found. Please ensure MongoDB is installed and running."
fi

echo ""
echo "🎉 Backend setup completed!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Start MongoDB (if not already running)"
echo "3. Run the backend: cd backend && npm run dev"
echo "4. The API will be available at http://localhost:5000"
echo ""
echo "📚 For more information, see backend/README.md" 