const express = require("express");

const server = express()
const port = process.env.PORT || 6000

server.use(express.json())
server.use(logger)


function logger(req,res,next){
    console.log(`${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}`)
    next()
};

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "OOPS something went wrong"})
});

server.listen(port, () => {
    console.log(`Server listening at port ${port} !!!!!!!!`)
});