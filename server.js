const Operation = require('./operation');
const OperationFactory = require('./operation-factory');


class Server {
  constructor() {
    this.operationHistory = [];
    this.buffer = [];
    this.clients = [];
    this.state = [];
  }

  receive() {
    const op = this.popFromBuffer();
    if (op === null) {
      return;
    }

    op.applyOperation(this.state);
    this.operationHistory.push(op);

    op.checkState(this.state);

    this.send(op);
  }

  send(op) {
    this.clients.forEach(client => {
      if (client === op.getClient()) {
        const syncOp = OperationFactory.createSyncOperation(op);
        client.getBuffer().push(syncOp);
      } else {
        client.getBuffer().push(op.clone());
      }
    });
  }

  popFromBuffer() {
    if (this.getBuffer().length === 0) {
      return null;
    }

    return this.getBuffer().splice(0, 1)[0];
  }

  connectToServer(client) {
    this.clients.push(client);
  }

  getBuffer() {
    return this.buffer;
  }

  printState() {
    console.log(`==== server's state: "${this.state.join('')}"`);
  }

  printBuffer() {
    console.log('==== server\'s buffer:');
    this.getBuffer().forEach(op => {
      console.log(`  ${op.toString()}`);
    })
  }

  printOperationHistory() {
    console.log(`==== server\'s operation history:`);
    this.operationHistory.forEach(op => {
      console.log(op.toString());
    });
  }
}

module.exports = new Server();
