
import HandleView from "./modules/HandleView.js";

const handleView = new HandleView();
handleView.setModal('#new-transaction');
handleView.unSetModal('.modal-close');
// handleView.outCloseModal();

handleView.updateSummary();


handleView.updateTable();

document.getElementById('save').addEventListener('click', handleView.readFieldsForm);
document.getElementById('select-type-transaction')
.addEventListener('change', handleView.checkSelectForm);

document.querySelector('#transaction-filter').addEventListener('change', handleView.checkSelectTypeFilter);

document.querySelector('#category-filter').addEventListener('change', handleView.checkSelectCategoryFilter);

