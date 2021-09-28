class HandleStorage {
  constructor() {
    this.dbTransaction = [];
  }

  create(transaction) {
    this.dbTransaction = this.read();
    this.dbTransaction.push(transaction);
    localStorage.setItem('dbTransaction', JSON.stringify(this.dbTransaction));
  }
  
  read() {
    return JSON.parse(localStorage.getItem('dbTransaction')) ?? this.dbTransaction;
  }
  
  update(index, transaction) {
    this.dbTransaction = this.read();
    this.dbTransaction[index] = transaction;
    localStorage.setItem('dbTransaction', JSON.stringify(this.dbTransaction));
  }
  
  delete(index) {
    this.dbTransaction = this.read();
    this.dbTransaction.splice(index, 1);
    localStorage.setItem('dbTransaction', JSON.stringify(this.dbTransaction));
  }
}

export default HandleStorage;