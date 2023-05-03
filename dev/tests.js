const Blockchain = require("./blockchain")

const btc = new Blockchain();
const prevBlockHash = "ASDFADSFASDFASDFASDFADSFADS";

const currentBlockData = [{
    amount: 10,
    sender: "sender1",
    recipient: "recipient1",

}, {
    amount: 50,
    sender: "sender2",
    recipient: "recipient2",

}];

console.log(btc.hashBlack(prevBlockHash, currentBlockData, 51836))