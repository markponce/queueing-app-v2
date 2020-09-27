const CustomerType = {
  NORMAL: 1,
  SENIOR: 2,
  PWD: 3,
  PREGNANT: 4
}

Object.freeze(CustomerType);
exports.CustomerType = CustomerType;

const QueueStatus = {
  QUEUED: 0,
  CALLED : 1,
  DONE : 2,
}

Object.freeze(QueueStatus);
exports.QueueStatus = QueueStatus;

