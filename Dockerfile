# Specify Node.js version (e.g., 18 for Long-Term Support)
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ENV PORT=3000

# Expose the port your app runs on (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
