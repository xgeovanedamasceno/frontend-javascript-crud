import areFieldsValid from "./areFieldsValid.js";
import getStringDate from "./getDate.js";
import openModal from "./openModal.js"
import closeModal from "./closeModal.js"



import HandleTransaction from "./HandleTransaction.js";



export default class HandleView {
  constructor() {
    this.editTransaction = this.editTransaction.bind(this);
    this.showTransaction = this.showTransaction.bind(this);

  }
  
  addEventListenerToButtonsTransactions() {

    const editButtons = document.querySelectorAll('[name="edit"]');
    const deleteButtons = document.querySelectorAll('[name="delete"]');
    
    editButtons.forEach(button => {
      button.addEventListener('click', this.showModal);
      button.addEventListener('click', this.editTransaction);

    });



    deleteButtons.forEach(button => {
      // button.addEventListener('click', deleteTransaction);
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
    // 
    this.checkSelectForm(categorySelected);
  }
  
  
  readFieldsForm(event) {
    event.preventDefault();

    const handleTransaction = new HandleTransaction();
    event.preventDefault();

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
    }
  }

  updateTable() {
    const handleTransaction = new HandleTransaction();
    const transactions = handleTransaction.getTransactions();
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
  
  
  
  // outCloseModal() {
  //   if(e.target === this) this.hiddenModal(e);
  //   document.querySelector('.modal').addEventListener('click', this.hiddenModal);
  // }
  
  unSetModal(listener) {
    document.querySelector(listener).addEventListener('click', this.hiddenModal);
  }
  
  setModal(listener) {
    console.log(this);
    document.querySelector(listener).addEventListener('click',this.showModal);
  }


 
}