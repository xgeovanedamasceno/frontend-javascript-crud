
import HandleView from "./modules/HandleView.js";





const handleView = new HandleView();
handleView.setModal('#new-transaction');
handleView.unSetModal('.modal-close');
// handleView.outCloseModal();



handleView.updateTable();
document.getElementById('save').addEventListener('click', handleView.readFieldsForm);
document.getElementById('select-type-transaction')
.addEventListener('change', handleView.checkSelectForm);

// function closeModal(e) {
//   e.preventDefault();
//   document.querySelector('.modal').classList.remove('active');
// }
// function openModal(e) {
//   e.preventDefault();
//   if (e.target.name === 'edit') handleView.editTransaction(e);
//   document.querySelector('.modal').classList.add('active');
    
// }


// document.querySelector('#new-transaction').addEventListener('click', openModal);
// document.querySelector('.modal-close').addEventListener('click', closeModal);

// document.querySelector('.edit').addEventListener('click', openModal);
