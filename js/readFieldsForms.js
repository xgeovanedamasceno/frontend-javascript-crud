import Transaction from "./modules/classes/Transaction.js";
import HandleStorage from "./modules/HandleStorage.js";

export default function readFieldsForm() {
    const description = document.getElementById('input-description').value;
    const valueTransaction = document.getElementById('input-amount').value;
    const type = document.getElementById('select-type-transaction').value;
    const category = document.getElementById('select-category-transaction').firstChild.value;
    const index = document.getElementById('input-description').dataset.flag;

    if (index === 'new') {
      const date = document.getElementById('date').value;
      const transaction = new Transaction(date, description, valueTransaction, type, category);
      const storage = new HandleStorage();
      storage.create(transaction);
    }
}