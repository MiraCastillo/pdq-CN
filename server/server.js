const express = require ("express");
const bodyParser = require("body-parser");
const axios = require("axios")
const socket = require("socket.io")


const app = express()
app.use(bodyParser.json())

app.use(express.static( `${__dirname}/../build` ))

const io = socket(app.listen(5000, console.log("Zombies to fight on port 5000")))
var loading = false

app.get("/api/readMind", (req, res) => {
    if(!loading){
        loading = true
        io.sockets.emit("in-use")
        axios.get("https://pdqweb.azurewebsites.net/api/brain").then(thought => {
            io.sockets.emit("open", thought.data)
            res.sendStatus(200)
            loading = false
        }).catch(err => {
            res.sendStatus(500)
            loading = false
            io.sockets.emit("open", "error")
        })
    } else {
        io.sockets.emit("in-use")
    }
})

io.on("connection", socket => {
    console.log("User connected")
})

