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

  deleteTransaction(index) {
    this.handleStorage.delete(index);
  }

  getTransactions() {
    return this.handleStorage.read();
  }

  getSpecificTransaction(index) {
    return this.handleStorage.read()[index];
  }

  getCurrentBalance() {
    const transactions = this.handleStorage.read();
    let sumBalance = 0;
    transactions.forEach(transaction => {
      if(transaction.type === 'income') sumBalance += +transaction.value;
    })
    return sumBalance = this.getTotalIncomes() - this.getTotalExpenses();
  }

  getTotalIncomes() {
    const transactions = this.handleStorage.read();
    let sumIncomes = 0;
    transactions.forEach(transaction => {
      if(transaction.type === 'income') sumIncomes += +transaction.value;
    })
    return sumIncomes;
  }

  getTotalExpenses() {
    const transactions = this.handleStorage.read();
    let sumExpenses = 0;
    transactions.forEach(transaction => {
      if(transaction.type === 'expense') sumExpenses += +transaction.value;
    })
    return sumExpenses;
  }

  getIncomes() {
    const incomesTransactions = this.getTransactions();
    let incomes = [];
    incomesTransactions.forEach(income => {
      incomes = incomesTransactions.filter(this.transactionIsIncome, income);
    });

    return incomes;
  }

  getExpenses() {
    const expensesTransactions = this.getTransactions();
    let expenses = [];
    expensesTransactions.forEach(expense => {
      expenses = expensesTransactions.filter(this.transactionIsExpense, expense);
    });

    return expenses;
  }

  transactionIsIncome(income) {
    return income.type == 'income';
  }

  transactionIsExpense(expense) {
    return expense.type == 'expense';
  }

}