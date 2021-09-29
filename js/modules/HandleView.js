import areFieldsValid from "./areFieldsValid.js";
import getStringDate from "./getDate.js";
import openModal from "./openModal.js"
import closeModal from "./closeModal.js"



import HandleTransaction from "./HandleTransaction.js";



export default class HandleView {
  constructor() {
    this.editTransaction = this.editTransaction.bind(this);
    this.showTransaction = this.showTransaction.bind(this);
    this.readFieldsForm = this.readFieldsForm.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.checkSelectTypeFilter = this.checkSelectTypeFilter.bind(this);
    this.checkSelectCategoryFilter = this.checkSelectCategoryFilter.bind(this);


  }
  
  addEventListenerToButtonsTransactions() {

    const editButtons = document.querySelectorAll('[name="edit"]');
    const deleteButtons = document.querySelectorAll('[name="delete"]');
    
    editButtons.forEach(button => {
      button.addEventListener('click', this.showModal);
      button.addEventListener('click', this.editTransaction);
    });


    deleteButtons.forEach(button => {
      button.addEventListener('click', this.deleteTransaction);
    })
  }

  checkSelectForm(event) {
    const { value } = event.target;
    const incomeSelect = document.querySelector('.income-category');
    const expenseSelect = document.querySelector('.expense-category');
  
  
    if (value === 'income') {
      expenseSelect.classList.remove('active');
      expenseSelect.removeAttribute('required');
  
      incomeSelect.classList.add('active');
      incomeSelect.setAttribute('required', '');
    }
    if (value === 'expense') {
      incomeSelect.classList.remove('active');
      incomeSelect.removeAttribute('required');
  
      expenseSelect.classList.add('active');
      expenseSelect.setAttribute('required', '');
    }
  
  }

  checkSelectTypeFilter(e) {
    const value = e.target.value;
    if (value === 'income') this.getIncomeTransactions(value);
    if (value === 'expense') this.getExpenseTransactions(value);
  }

  checkSelectCategoryFilter(e) {
    const value = e.target.value;
    const handleTransaction = new HandleTransaction();

    switch (value) {
      case 'food':
        const foodExpenses = handleTransaction.getExpensesByCategory(value);
        this.clearTable();
        foodExpenses.forEach(this.showTransaction);
        break;
      case 'home' :
        const homeExpenses = handleTransaction.getExpensesByCategory(value);
        this.clearTable();
        homeExpenses.forEach(this.showTransaction);
        break;
      case 'health' :
        const healthExpenses = handleTransaction.getExpensesByCategory(value);
        this.clearTable();
        healthExpenses.forEach(this.showTransaction);
        break;
      case 'auto' :
        let autoExpenses = handleTransaction.getExpensesByCategory(value);
        this.clearTable();
        autoExpenses.forEach(this.showTransaction);
        break;
      case 'freetime' :
        let freetimeExpenses = handleTransaction.getExpensesByCategory(value);
        this.clearTable();
        freetimeExpenses.forEach(this.showTransaction);
        break;
      case 'salary' :
        let salaryIncomes = handleTransaction.getIncomesByCategory(value);
        this.clearTable();
        salaryIncomes.forEach(this.showTransaction);
        break;
      case 'bonus' :
        let bonusIncomes = handleTransaction.getIncomesByCategory(value);
        this.clearTable();
        bonusIncomes.forEach(this.showTransaction);
        break;
      case 'roi' :
        let roiIncomes = handleTransaction.getIncomesByCategory(value);
        this.clearTable();
        roiIncomes.forEach(this.showTransaction);
        break;
      case 'rent-roi' :
        let rentIncomes = handleTransaction.getIncomesByCategory(value);
        this.clearTable();
        rentIncomes.forEach(this.showTransaction);
        break;
      default :
        0;
    }

  }

  clearFieldsForm() {
      const formFields = document.querySelectorAll('.form-field');
      formFields.forEach(field => {
      field.value = '';
    })
  }

  clearTable() {
    const rows = document.querySelectorAll('#report tbody tr');
    rows.forEach(row => row.parentElement.removeChild(row));
  }

  createCategoryElement(value) {
    const categoryFilter = document.getElementById('category-filter');
    if(value === 'income') {
      categoryFilter.innerHTML = `
      <label for="${value}-category-filter">Categoria</label>
      <select name="${value}-category-filter" id="${value}-category">
        <option disabled selected value>Selecione</option>
        <option value="salary">Salário</option>
        <option value="bonus">Bônus</option>
        <option value="roi">Ações</option>
        <option value="rent-roi">Renda de alugueis</option>
      </select>
    `
    } else {
      categoryFilter.innerHTML = `
        <label for="${value}-category-filter">Categoria</label>
        <select name="${value}-category-filter" id="${value}-category">;
          <option disabled selected value>Selecione</option>
          <option value="food">Alimentação</option>
          <option value="home">Moradia</option>
          <option value="health">Saúde</option>
          <option value="auto">Transporte</option>
          <option value="freetime">Lazer</option>
        </select>
      `
    }
  }
  

  deleteTransaction(e) {
    const index = e.target.id;
    const handleTransaction = new HandleTransaction();
    handleTransaction.deleteTransaction(index);
    this.updateTable();
  }


  editTransaction(event) {
    const index = event.target.id;
    const handleTransaction = new HandleTransaction();
    const transaction = handleTransaction.getSpecificTransaction(index);

    this.fillFieldsForm(transaction, index);
  }

  fillFieldsForm(transaction, index) {
    console.log(transaction);
    const {date, description, value, type, category } = transaction;
    document.getElementById('input-description').dataset.flag = index;
    document.getElementById('date').innerHTML = date;
    document.getElementById('input-description').value = description;
    document.getElementById('input-amount').value = value;
    
    document.getElementById('select-type-transaction').value = type;

    const categorySelected = `.${type}-category`;
    console.log(categorySelected);
    document.querySelector('#select-category-transaction').querySelector(categorySelected).value = category;
    
  }

  getIncomeTransactions(value) {
    const handleTransaction = new HandleTransaction();
    const incomes = handleTransaction.getIncomes();
    this.clearTable();
    this.createCategoryElement(value);
    incomes.forEach(this.showTransaction);
  }

  getExpenseTransactions(value) {
    const handleTransaction = new HandleTransaction();
    const expenses = handleTransaction.getExpenses();
    this.clearTable();
    this.createCategoryElement(value);
    expenses.forEach(this.showTransaction);
  }

  updateSummary() {
    const handleTransaction = new HandleTransaction();
    const currentBalance = handleTransaction.getCurrentBalance();
    const totalIncomes = handleTransaction.getTotalIncomes();
    const totalExpenses = handleTransaction.getTotalExpenses();
    document.querySelector('#current-balance').innerText = `Saldo Atual: R$ ${currentBalance}`;
    document.querySelector('#total-incomes').innerText = `Total de Receitas: R$ ${totalIncomes}`;
    document.querySelector('#total-expenses').innerText = `Total de Despesas: R$ ${totalExpenses}`;
  }
  
  
  readFieldsForm(event) {
    event.preventDefault();

    const handleTransaction = new HandleTransaction();


    const bufferTransaction = handleTransaction.getBufferTransaction();

    if (areFieldsValid()) {
      bufferTransaction.description = document.getElementById('input-description').value;
      bufferTransaction.valueTransaction = document.getElementById('input-amount').value;
      bufferTransaction.type =  document.getElementById('select-type-transaction').value;
      bufferTransaction.category = document.querySelector('#select-category-transaction').querySelector('.active').querySelector('.category-transaction').value;
    }      
    const index = document.getElementById('input-description').dataset.flag;

    if (index === 'new') {
      const date = getStringDate();
      const { description, valueTransaction, type, category } = bufferTransaction;
      handleTransaction.saveTransaction(date, description, valueTransaction, type, category);
      console.log(this);
      this.updateTable();
      this.clearFieldsForm();


    } else {
      bufferTransaction.date = document.getElementById('date').innerText;
      bufferTransaction.date = '29/9/2021';
      console.log('fix date');
      bufferTransaction.description = document.getElementById('input-description').value;
      bufferTransaction.valueTransaction = document.getElementById('input-amount').value;
      bufferTransaction.type =  document.getElementById('select-type-transaction').value;
      bufferTransaction.category = document.querySelector('#select-category-transaction').querySelector('.active').querySelector('.category-transaction').value;
      
      handleTransaction.updateTransaction(index, bufferTransaction);
      this.updateTable();
      this.clearFieldsForm();
    }
  }

  updateTable() {
    const handleTransaction = new HandleTransaction();
    const transactions = handleTransaction.getTransactions();
    this.clearTable();
    transactions.forEach(this.showTransaction);
    this.addEventListenerToButtonsTransactions();

  }


  showTransaction(transaction, index) {
    const tableDash = document.querySelector('#report  tbody');
    const newRowTransaction = document.createElement('tr');
    newRowTransaction.innerHTML = `
      <td>${transaction.value}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>${transaction.type}</td>
      <td>${transaction.date}</td>
      <td>
        <button type="button" id="${index}" name="edit" class="edit">Editar Transação</button>
        <button type="button" id="${index}" name="delete" class="delete">Apagar Transação</button>
      </td>
    `
    tableDash.appendChild(newRowTransaction);
    
  }

  showModal(e) {
    e.preventDefault();
    console.log(this);

    document.querySelector('.modal').classList.add('active');
  }
  
  
  
  hiddenModal(e) {
    e.preventDefault();
    document.querySelector('.modal').classList.remove('active');
  }
  
  unSetModal(listener) {
    document.querySelector(listener).addEventListener('click', this.hiddenModal);
  }
  
  setModal(listener) {
    document.querySelector(listener).addEventListener('click',this.showModal);
  }


 
}