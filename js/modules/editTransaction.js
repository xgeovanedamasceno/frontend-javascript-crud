import Transaction from "./classes/Transaction.js";
import fillFieldsForm from "./fillFieldsForm.js";
import HandleStorage from "./HandleStorage.js";

export function editTransaction(event) {
  const index = event.target.id;

  const storage = new HandleStorage();
  const {date, description, value, type, category} = storage.read()[index];

  const transaction = new Transaction(date, description, value, type, category);
  fillFieldsForm(transaction, index);
  // openModal();
}