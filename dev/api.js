const express = require("express")
const Blockchain = require("./blockchain")
const bodyParser = require("body-parser")


const btc = new Blockchain();
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get("/", function(req, res) {
    res.send("Hello world")
});

app.get("/blockchain", function(req, res) {
    res.send(btc)
});

app.post("/transaction", function(req, res) {
    const blockIndex = btc.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({
        note: `This transaction will be added in block ${blockIndex}`
    })
});

app.listen(3000, function() {
    console.log("server is running on http://localhost:3000")
})