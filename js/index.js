
import HandleView from "./modules/HandleView.js";





const handleView = new HandleView();

handleView.showModal('#new-transaction');
handleView.hiddenModal('.modal-close');

handleView.updateTable();
document.getElementById('save').addEventListener('click', handleView.readFieldsForm);
document.getElementById('select-type-transaction')
.addEventListener('change', handleView.checkSelectForm);


