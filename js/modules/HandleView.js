import HandleTransaction from "./HandleTransaction.js";
import UtilHandleView from "./UtilHandleView.js";



export default class HandleView {
  constructor() {
    this.editTransaction = this.editTransaction.bind(this);
    this.showTransaction = this.showTransaction.bind(this);
    this.readFieldsForm = this.readFieldsForm.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.checkSelectTypeFilter = this.checkSelectTypeFilter.bind(this);
    this.checkSelectCategoryFilter = this.checkSelectCategoryFilter.bind(this);

    this.utilView = new UtilHandleView();
    this.handleTransaction = new HandleTransaction();

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

  checkSelectTypeFilter(event) {
    const typeSelected = event.target.value;
    if (typeSelected != '') this.getListByType(typeSelected);
  }

  checkSelectCategoryFilter(event) {
    const categorySelected = event.target.value;
    const typeSelected = document.querySelector('#transaction-filter').value;


    if (categorySelected != '') this.getListByCategory(typeSelected, categorySelected);
    

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

  createCategoryElement(typeSelected) {
    const categoryFilter = document.getElementById('category-filter');
    if(typeSelected === 'income') {
      categoryFilter.innerHTML = `
      <label for="${typeSelected}-category-filter">Categoria</label>
      <select name="${typeSelected}-category-filter" id="${typeSelected}-category">
        <option disabled selected value>Selecione</option>
        <option value="salary">Salário</option>
        <option value="bonus">Bônus</option>
        <option value="roi">Ações</option>
        <option value="rent-roi">Renda de alugueis</option>
      </select>
    `
    } else {
      categoryFilter.innerHTML = `
        <label for="${typeSelected}-category-filter">Categoria</label>
        <select name="${typeSelected}-category-filter" id="${typeSelected}-category">;
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
    this.handleTransaction.deleteTransaction(index);
    this.updateTable();
    this.updateSummary();
  }


  editTransaction(event) {
    const index = event.target.id;
    const transaction = this.handleTransaction.getSpecificTransaction(index);

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

  getListByType(typeSelected) {
    const transactions = this.handleTransaction.getTransactionsByType(typeSelected);
    this.clearTable();
    this.createCategoryElement(typeSelected);
    transactions.forEach(this.showTransaction);
  }

  getListByCategory(typeSelected, categorySelected) {
    const expenses = this.handleTransaction.getTransactionsByCategory(typeSelected, categorySelected); 
    this.clearTable();
    this.createCategoryElement(typeSelected);
    expenses.forEach(this.showTransaction);
  }

  updateSummary() {
    const currentBalance = this.handleTransaction.getCurrentBalance();
    const totalIncomes = this.handleTransaction.getTotalIncomes();
    const totalExpenses = this.handleTransaction.getTotalExpenses();
    document.querySelector('#current-balance').innerText = `Saldo Atual: R$ ${currentBalance}`;
    document.querySelector('#total-incomes').innerText = `Total de Receitas: R$ ${totalIncomes}`;
    document.querySelector('#total-expenses').innerText = `Total de Despesas: R$ ${totalExpenses}`;
  }
  
  
  readFieldsForm(event) {
    event.preventDefault();

    const bufferTransaction = this.handleTransaction.getBufferTransaction();

    if (this.utilView.areFieldsValid()) {
      bufferTransaction.description = document.getElementById('input-description').value;
      bufferTransaction.valueTransaction = document.getElementById('input-amount').value;
      bufferTransaction.type =  document.getElementById('select-type-transaction').value;
      bufferTransaction.category = document.querySelector('#select-category-transaction').querySelector('.active').querySelector('.category-transaction').value;
    }      
    const index = document.getElementById('input-description').dataset.flag;

    if (index === 'new') {
      const date = this.utilView.getStringDate();
      const { description, valueTransaction, type, category } = bufferTransaction;
      this.handleTransaction.saveTransaction(date, description, valueTransaction, type, category);
      this.updateTable();
      this.updateSummary();
      this.clearFieldsForm();


    } else {
      bufferTransaction.date = document.getElementById('date').innerText;
      bufferTransaction.date = '30/9/2021';
      console.log('fix date');
      bufferTransaction.description = document.getElementById('input-description').value;
      bufferTransaction.valueTransaction = document.getElementById('input-amount').value;
      bufferTransaction.type =  document.getElementById('select-type-transaction').value;
      bufferTransaction.category = document.querySelector('#select-category-transaction').querySelector('.active').querySelector('.category-transaction').value;
      
      this.handleTransaction.updateTransaction(index, bufferTransaction);
      this.updateTable();
      this.clearFieldsForm();
    }
  }

  updateTable() {
    const transactions = this.handleTransaction.getTransactions();
    this.clearTable();
    transactions.forEach(this.showTransaction);
    this.updateSummary();
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