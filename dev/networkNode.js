const express = require("express")
const Blockchain = require("./blockchain")
const bodyParser = require("body-parser")

const port = process.argv[2]

const { v4: uuidv4 } = require('uuid');
const nodeAddress = uuidv4().split('-').join('');


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



// mine the pending transactions
app.get("/mine", function(req, res) {
    const lastBlock = btc.getLastBlock();
    const prevBlockHash = lastBlock["hash"]

    const currentBlockData = {
        transaction: btc.pendingTransactions,
        index: lastBlock["index"] + 1
    }
    const nonce = btc.proofOfWork(prevBlockHash, currentBlockData)

    btc.createNewTransaction(1.5, "00000000", nodeAddress)

    const blockHash = btc.hashBlack(prevBlockHash, currentBlockData, nonce)
    const newBlock = btc.createNewBlock(nonce, prevBlockHash, blockHash);

    res.json({
        notice: `New Block added successfully.`,
        block: newBlock,
    })
});




app.post("/transaction", function(req, res) {
    const blockIndex = btc.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({
        note: `This transaction will be added in block ${blockIndex}`
    })
});

app.get("/wallet", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/wallet", function(req, res) {
    const blockIndex = btc.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({
        note: `This transaction will be added in block ${blockIndex}`
    })
});

app.listen(port, function() {
    console.log(`server is running on http://localhost:${port}`)
})