FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
# RUN npm install
RUN npm ci

# Copy app files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]