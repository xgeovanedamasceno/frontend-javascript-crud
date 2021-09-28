export default function addEventListenerTo(button) {
  const name = button.getAttribute('name');
  if(name === 'edit') {
    button.addEventListener('click', editTransaction);
  } else {
    button.addEventListener('click', deleteTransaction);
  }
}