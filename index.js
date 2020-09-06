const express = require("express");

const server = express()
const port = process.env.PORT || 6000

server.use(express.json())


server.listen(port, () => {
    console.log(`Server listening at port ${port} !!!!!!!!`)
});