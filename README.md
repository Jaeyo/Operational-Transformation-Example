# Operational Transformaton Example

Operational Transformation: https://en.wikipedia.org/wiki/Operational_transformation

node.js port of https://github.com/Fleischers/OT_example

## Example
```javascript
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
```
