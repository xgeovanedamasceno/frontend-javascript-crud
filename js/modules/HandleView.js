import areFieldsValid from "./areFieldsValid.js";
import getStringDate from "./getDate.js";
import openModal from "./openModal.js"
import closeModal from "./closeModal.js"



import HandleTransaction from "./HandleTransaction.js";



export default class HandleView {
  constructor() {
    
  }
  
  addEventListenerToButtonsTransactions() {
    console.log(this);
    const editButtons = document.querySelectorAll('[name="edit"]');
    const deleteButtons = document.querySelectorAll('[name="delete"]');
    
    editButtons.forEach(button => {
      button.addEventListener('click', this.EditTransaction);

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
    console.log(index);
    document.querySelector('#new-transaction').removeEventListener('click', openModal);

    const handleTransaction = new HandleTransaction();
    const specificTransaction = handleTransaction.getSpecificTransaction(index);

    console.log(specificTransaction);
    this.fillFieldsForm(specificTransaction, index);
  }

  fillFieldsForm(transaction, index) {
    const {date, description, value, type, category } = transaction;
    document.getElementById('input-description').dataset.flag = index;
    document.getElementById('date').innerHTML = date;
    document.getElementById('input-description').value = description;
    document.getElementById('input-amount').value = value;
    document.getElementById('select-type-transaction').value = type;
    document.querySelector('.category-transaction').value = category;
  }
  
  
  readFieldsForm(event) {

    document.querySelector('#new-transaction').removeEventListener('click',this.modal.open)

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
    console.log(this);
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

 
}