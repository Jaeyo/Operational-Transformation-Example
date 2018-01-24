const InsertOperation = require('./operations/insert-operation');
const DeleteOperation = require('./operations/delete-operation');
const ReplaceOperation = require('./operations/replace-operation');
const SyncOperation = require('./operations/sync-operation');


class OperationFactory {
  static createInsertOperation(startPosition, data, toEnd) {
    return new InsertOperation(startPosition, data, toEnd);
  }

  static createDeleteOperation(startPosition, endPosition) {
    return new DeleteOperation(startPosition, endPosition);
  }

  static createReplaceOperation(startPosition, endPosition, data) {
    return new ReplaceOperation(startPosition, endPosition, data);
  }

  static createSyncOperation(referenceOperation) {
    return new SyncOperation(referenceOperation);
  }
}

module.exports = OperationFactory;
