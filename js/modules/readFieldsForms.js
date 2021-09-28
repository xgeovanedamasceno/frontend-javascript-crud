import Transaction from "./classes/Transaction.js";
import HandleStorage from "./HandleStorage.js";
import { bufferTransaction } from "./objects/bufferTransaction.js";

export default function readFieldsForm() {

  bufferTransaction.description = document.getElementById('input-description').value;
  bufferTransaction.value = document.getElementById('input-amount').value;
  bufferTransaction.type =  document.getElementById('select-type-transaction').value;
        
  const index = document.getElementById('input-description').dataset.flag;

  if (index === 'new') {
    const date = '28/09/2021';
    const { description, valueTransaction, type, category } = bufferTransaction;
    const transaction = new Transaction(date, description, valueTransaction, type, category);
    const storage = new HandleStorage();
    storage.create(transaction);
  }
}