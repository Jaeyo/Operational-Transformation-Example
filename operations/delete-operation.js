const Operation = require('../operation');
const OperationFactory = require('../operation-factory');


class DeleteOperation extends Operation {
  constructor(startPosition, endPosition) {
    super(Operation.DELETE);
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  clone() {
    const clonedOp = new DeleteOperation(this.startPosition, this.endPosition);
    clonedOp.setClient(this.getClient());
    clonedOp.setOriginalOperation(this);
    return this;
  }

  checkState(state) { }

  applyOperation(state) {
    if (this.startPosition >= state.length) {
      return;
    }

    const deleteLength = this.endPosition - this.startPosition;
    state.splice(this.startPosition, deleteLength);
  }

  doSync(state) { }

  toString() {
    return `delete range: ${this.startPosition} - ${this.endPosition} positions from client${this.getClient().id}`;
  }
}

module.exports = DeleteOperation;
