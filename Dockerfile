FROM node:14

# Create Directory for the Container
WORKDIR /usr/src/app

# Copy both package.json & package-lock.json
COPY package*.json ./

# Install global dependencies
RUN npm install typescript -g
RUN npm install pm2 -g

# Install local dependencies
RUN npm ci --only-production

# Bundle app source
COPY . .

# Create production build
RUN npm run build

# Tests check
RUN npm run test

# Gets rid of any development dependencies
RUN npm prune --production

EXPOSE 3000
CMD ["pm2-runtime","pm2.yaml"]