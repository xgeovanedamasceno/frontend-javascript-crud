import addEventListenerTo from "./addEventListenerTo.js";

export default function showTransaction(transaction, index) {
  const tableDash = document.querySelector('#report  tbody');
  const newTransaction = document.createElement('tr');
  newTransaction.innerHTML = `
    <td>${transaction.value}</td>
    <td>${transaction.description}</td>
    <td>${transaction.category}</td>
    <td>${transaction.type}</td>
    <td>${transaction.date}</td>
    <td>
      <button type="button" id="${index}" name="edit">Editar Transação</button>
      <button type="button" id="${index}" name="delete">Apagar Transação</button>
    </td>
  `
  tableDash.appendChild(newTransaction);

  const editButton = document.querySelectorAll('[name="edit"]');
  const deleteButton = document.querySelectorAll('[name="delete"]');

  editButton.forEach(addEventListenerTo);
  deleteButton.forEach(addEventListenerTo);
;
}