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

  getExpensesByCategory(value) {

    const transactions = this.getTransactions();
    switch (value) {
      case 'food':
        let foodExpenses = [];
        transactions.forEach(transaction => {
          foodExpenses = transactions.filter(this.transactionIsFood, transaction);
        });
        return foodExpenses;
      case 'home' :
        let homeExpenses = [];
        transactions.forEach(transaction => {
          homeExpenses = transactions.filter(this.transactionIsHome, transaction);
        });
        return homeExpenses;
      case 'health' :
        let healthExpenses = [];
        transactions.forEach(transaction => {
          healthExpenses = transactions.filter(this.transactionIsHealth, transaction);
        });
        return healthExpenses;
      case 'auto' :
        let autoExpenses = [];
        transactions.forEach(transaction => {
          autoExpenses = transactions.filter(this.transactionIsAuto, transaction);
        });
        return autoExpenses;
      case 'freetime' :
        let freetimeExpenses = [];
        transactions.forEach(transaction => {
          freetimeExpenses = transactions.filter(this.transactionIsFreeTime, transaction);
        });
        return freetimeExpenses;
      default :
        0;
    }
  }


  getIncomesByCategory(value) {
    const transactions = this.getTransactions();
    switch (value) {
      case 'salary' :
        let salaryIncomes = [];
        transactions.forEach(transaction => {
          salaryIncomes = transactions.filter(this.transactionIsSalary, transaction);
        });
        return salaryIncomes;
      case 'bonus' :
        let bonusIncomes = [];
        transactions.forEach(transaction => {
          bonusIncomes = transactions.filter(this.transactionIsBonus, transaction);
        });
        return bonusIncomes;
      case 'roi' :
        let roiIncomes = [];
        transactions.forEach(transaction => {
          roiIncomes = transactions.filter(this.transactionIsRoi, transaction);
        });
        return roiIncomes;
      case 'rent-roi' :
        let rentIncomes = [];
        transactions.forEach(transaction => {
          rentIncomes = transactions.filter(this.transactionIsRent, transaction);
        });
        return rentIncomes;
      default :
        0;
    }

  }

  transactionIsFood(transaction) {
    return transaction.category === 'food' && transaction.type === 'expense';
  }
  
  transactionIsHome(transaction) {
    return transaction.category === 'home' && transaction.type === 'expense';
  }
  
  transactionIsHealth(transaction) {
    return transaction.category === 'health' && transaction.type === 'expense';
  }
  
  transactionIsAuto(transaction) {
    return transaction.category === 'auto' && transaction.type === 'expense';
  }
  
  transactionIsFreeTime(transaction) {
    return transaction.category === 'freetime' && transaction.type === 'expense';
  }
  
  transactionIsSalary(transaction) {
    return transaction.category === 'salary' && transaction.type === 'income';
  }
  
  transactionIsBonus(transaction) {
    return transaction.category === 'bonus' && transaction.type === 'income';
  }
  
  transactionIsRoi(transaction) {
    return transaction.category === 'roi' && transaction.type === 'income';
  }
  
  transactionIsRent(transaction) {
    return transaction.category === 'rent-roi' && transaction.type === 'income';
  }
  
  transactionIsIncome(income) {
    return income.type === 'income';
  }

  transactionIsExpense(expense) {
    return expense.type === 'expense';
  }

}