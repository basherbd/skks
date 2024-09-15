from node
workdir /user/src/server
copy package*.json ./
run npm install
copy . .
expose 3000
CMD["node", "server.js"]