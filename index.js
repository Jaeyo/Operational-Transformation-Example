const OperationFactory = require('./operation-factory');
const Client = require('./client');
const server = require('./server');


const client1 = new Client();
const client2 = new Client();
const client3 = new Client();


client1.inputOperation(OperationFactory.createInsertOperation(0, 'a', 0));
server.receive();
client2.inputOperation(OperationFactory.createInsertOperation(0, 'b', 0));
server.receive();
client3.receive();
client3.inputOperation(OperationFactory.createInsertOperation(0, 'c', 0));
server.receive();
client2.receive();
client2.receive();
client1.receive();
client1.receive();
client3.inputOperation(OperationFactory.createReplaceOperation(0, 1, 'd'));
client1.receive();
client2.receive();
client1.inputOperation(OperationFactory.createDeleteOperation(2, 3));
server.receive();
client1.receive();
client2.receive();
client3.receive();
client3.receive();
client3.receive();
server.receive();
client1.receive();
client2.receive();
client3.receive();


console.log('\n==========================================================\n');
client1.printState();
client1.printBuffer();
console.log();

client2.printState();
client2.printBuffer();
console.log();

client3.printState();
client3.printBuffer();
console.log();

server.printState();
server.printBuffer();
console.log();
