export default function checkSelectForm(event) {
  const { value } = event.target;
  console.log(value);
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