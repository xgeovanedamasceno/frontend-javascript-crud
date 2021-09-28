import areFieldsValid from "./areFieldsValid.js";
import Transaction from "./classes/Transaction.js";
import getStringDate from "./getDate.js";
import HandleStorage from "./HandleStorage.js";
import { bufferTransaction } from "./objects/bufferTransaction.js";

export default function readFieldsForm(event) {
  event.preventDefault();
  if (areFieldsValid()) {
    bufferTransaction.description = document.getElementById('input-description').value;
    bufferTransaction.valueTransaction = document.getElementById('input-amount').value;
    bufferTransaction.type =  document.getElementById('select-type-transaction').value;
    bufferTransaction.category = document.querySelector('#select-category-transaction').querySelector('.active').querySelector('.category-transaction').value;
  }      
  const index = document.getElementById('input-description').dataset.flag;

  if (index === 'new') {
    const date = getStringDate();
    console.log(bufferTransaction.description)
    const { description, valueTransaction, type, category } = bufferTransaction;
    console.log(valueTransaction);
    const transaction = new Transaction(date, description, valueTransaction, type, category);
    const storage = new HandleStorage();
    storage.create(transaction);
  }
}