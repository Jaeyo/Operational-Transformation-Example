const Operation = require('../operation');
const DeleteOperation = require('./delete-operation');


class InsertOperation extends Operation {
  constructor(startPosition, data, toEnd) {
    super(Operation.INSERT);
    this.startPosition = startPosition;
    this.data = data;
    this.toEnd = toEnd;
  }

  clone() {
    const clonedOp = new InsertOperation(this.startPosition, this.data, this.toEnd);
    clonedOp.setClient(this.getClient());
    clonedOp.setOriginalOperation(this);
    return clonedOp;
  }

  checkState(state) {
    this.toEnd = state.length - 1 - this.startPosition;
  }

  applyOperation(state) {
    if (this.startPosition >= state.length) {
      let i = state.length;
      while (this.startPosition > i) {
        i++;
        state.push(' ');
      }

      let indexToAdd = this.startPosition;
      if ((state.length - this.toEnd) !== this.startPosition) {
        indexToAdd = state.length - this.toEnd;
      }

      state.splice(indexToAdd, 0, this.data);
      return;
    }

    if (state[this.startPosition] === ' ') {
      state[this.startPosition] = this.data;
      return;
    }

    if (this.toEnd === 0) {
      state.push(this.data);
      this.startPosition = state.length - 1;
      return;
    }

    state.splice(this.startPosition, 0, this.data);
  }

  doSync(state) {

    const originalOp = this.getOriginalOperation();
    if (this === originalOp) {
      return;
    }

    if (this.startPosition !== originalOp.startPosition || this.toEnd !== originalOp.toEnd) {
      const deleteOp = new DeleteOperation(originalOp.startPosition, originalOp.startPosition + 1);
      deleteOp.applyOperation(state);

      const insertOp = new InsertOperation(this.startPosition, originalOp.data, this.toEnd);
      insertOp.applyOperation(state);
    }
  }

  toString() {
    return `insert ${this.data}, pos: ${this.startPosition}, toEnd: ${this.toEnd} from client${this.getClient().id}`;
  }
}

module.exports = InsertOperation;
