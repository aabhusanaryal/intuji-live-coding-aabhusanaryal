import http from "http";

const PORT = process.env.PORT || 3000;

const server = require("./route.ts");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
