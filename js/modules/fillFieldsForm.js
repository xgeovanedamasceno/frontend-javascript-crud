export default function fillFieldsForm(transaction, index) {
  document.getElementById('input-description').dataset.flag = index;
  
  document.getElementById('date').innerHTML = transaction.getDate();
  document.getElementById('input-description').value = transaction.getDescription();
  document.getElementById('input-amount').value = transaction.getValue();
  document.getElementById('select-type-transaction').value = transaction.getType();
  document.getElementById('select-expense-category').value = transaction.getCategory();
}