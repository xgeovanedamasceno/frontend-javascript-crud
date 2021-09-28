export default function checkSelectForm(event) {
  const { value } = event.target;
  if (value === 'income') {
    document.querySelector('.expense-category').classList.remove('active');
    document.querySelector('.income-category').classList.add('active');
  }
  if (value === 'expense') {
    document.querySelector('.income-category').classList.remove('active');
    document.querySelector('.expense-category').classList.add('active');
  }

}