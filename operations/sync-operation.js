const Operation = require('../operation');
const OperationFactory = require('../operation-factory');


class SyncOperation extends Operation {
  constructor(originalOp) {
    super(Operation.SYNC);
    this.setOriginalOperation(originalOp);
  }

  getClient() {
    return this.getOriginalOperation().client;
  }

  clone() {
    return new SyncOperation(this);
  }

  checkState(state) { }

  applyOperation(state) { }

  doSync(state) {
    return this.getOriginalOperation().doSync(state);
  }

  toString() {
    return `sync operation for (${this.getOriginalOperation().toString()})`;
  }
}

module.exports = SyncOperation;
