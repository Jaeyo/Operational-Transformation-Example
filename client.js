const Operation = require('./operation');
const server = require('./server');
let nID = 0;


class Client {
  constructor() {
    this.id = ++nID;
    this.buffer = [];
    this.operationHistory = [];
    this.state = [];
    this.stateNoSync = [];

    this.notYetSynchronizedOperations = [];

    server.connectToServer(this);
  }

  inputOperation(op) {
    op.setClient(this);

    console.log(`Client${this.id} inputOperation: ${op}`);

    op.applyOperation(this.state);
    this.operationHistory.push(op);

    this.operationNeedToBeSynchronized(op);

    server.getBuffer().push(op.clone());
  }

  receive() {
    const op = this.popFromBuffer();
    if (op === null) {
      return;
    }

    if (this.isSynchronized() === false && op.isSyncOperation()) {
      this.operationSynchronized(op.getOriginalOperation());
      op.doSync(this.state);
      this.operationHistory.push(op);
      return;
    }

    op.applyOperation(this.state);
    this.operationHistory.push(op);
  }

  popFromBuffer() {
    if (this.getBuffer().length === 0) {
      return null;
    }

    return this.getBuffer().splice(0, 1)[0];
  }

  operationSynchronized(o)  {
    this.notYetSynchronizedOperations = this.notYetSynchronizedOperations.filter(item => item !== o);
  }

  operationNeedToBeSynchronized(o) {
    this.notYetSynchronizedOperations.push(o);
  }

  isSynchronized() {
    return this.notYetSynchronizedOperations.length === 0;
  }

  getBuffer() {
    return this.buffer;
  }

  printState() {
    console.log(`==== client${this.id}'s state: "${this.state.join('')}"`);
  }

  printOperationHistory() {
    console.log(`=== client${this.id}'s operation history:`);
    this.operationHistory.forEach(op => {
      console.log(op.toString());
    });
  }

  printBuffer() {
    console.log(`==== client${this.id}'s buffer:`);
    this.buffer.forEach(op => {
      console.log(op.toString());
    })
  }
}

module.exports = Client;
