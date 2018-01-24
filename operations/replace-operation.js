const Operation = require('../operation');


class ReplaceOperation extends Operation {
  constructor(startPosition, endPosition, data) {
    super(Operation.REPLACE);
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.data = data;
  }

  clone() {
    const clonedOp = new ReplaceOperation(this.startPosition, this.endPosition, this.data);
    clonedOp.setClient(this.getClient());
    clonedOp.setOriginalOperation(this);
    return clonedOp;
  }

  checkState(state) { }

  applyOperation(state) {
    if (this.startPosition >= state.length) {
      state.push(this.data);
      return
    }

    const replaceLength = this.endPosition - this.startPosition;
    state.splice(this.startPosition, replaceLength);
    state.splice(this.startPosition, 0, this.data);
  }

  doSync(state) { }


  toString() {
    return `replace, range: ${this.startPosition} - ${this.endPosition} positions, set to ${this.data} from client${this.getClient().id}`;
  }
}

module.exports = ReplaceOperation;
