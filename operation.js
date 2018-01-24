

class Operation {
  constructor(type) {
    this.type = type;
    this.originalOperation = null;
    this.client = null;
  }

  setOriginalOperation(op) {
    this.originalOperation = op;
  }

  setClient(client) {
    this.client = client;
  }

  getClient() {
    return this.client;
  }

  clone() {
    throw new Error('need to be override');
  }

  getOriginalOperation() {
    return this.originalOperation;
  }

  checkState(state) {
    throw new Error('need to be override');
  }

  applyOperation(state) {
    throw new Error('need to be override');
  }

  doSync(state) {
    throw new Error('need to be override');
  }

  isSyncOperation() {
    return this.type === Operation.SYNC;
  }

  toString() {
    throw new Error('need to be override');
  }

  static get INSERT() { return 1; }
  static get DELETE() { return 2; }
  static get REPLACE() { return 3; }
  static get SYNC() { return 0; }
}

module.exports = Operation;
