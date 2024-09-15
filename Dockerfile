from node
workdir /user/src/app
copy package*.json ./
run npm install
copy . .
expose 3000
CMD["node", "server.js"]