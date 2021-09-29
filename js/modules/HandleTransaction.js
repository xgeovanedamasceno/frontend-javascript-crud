import Transaction from "./classes/Transaction.js";
import HandleStorage from "./HandleStorage.js";

export default class HandleTransaction {
  constructor() {
    this.bufferTransaction = {
      id: 'null',
      date: 'null',
      description: 'null',
      valueTransaction: 'null',
      type: 'null',
      category: 'null',
    }

    this.handleStorage = new HandleStorage();
  }

  getBufferTransaction() {
    return this.bufferTransaction;
  
  }

  getNewTransaction(date, description, valueTransaction, type, category) {
    return newTransaction = new Transaction(date, description, valueTransaction, type, category);
  }

  saveTransaction(date, description, valueTransaction, type, category) {
    const transaction = new Transaction(date, description, valueTransaction, type, category);
    this.handleStorage.create(transaction);
  }

  updateTransaction(index, transaction) {
    const { date, description, valueTransaction, type, category } = transaction;
    const upTransaction = new Transaction(date, description, valueTransaction, type, category);
    this.handleStorage.update(index, upTransaction);
  }

  getTransactions() {
    return this.handleStorage.read();
  }

  getSpecificTransaction(index) {
    return this.handleStorage.read()[index];
  }


}