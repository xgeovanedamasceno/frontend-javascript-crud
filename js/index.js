import getCategoryForm from "./modules/getCategoryForm.js";
import checkSelectForm from "./modules/checkSelectForm.js";

import readFieldsForm from "./modules/readFieldsForms.js";
import updateTable from "./modules/updateTable.js";
import HandleModal from "./modules/HandleModal.js";



const modal = new HandleModal('.modal','active');
modal.open('#new-transaction');
modal.close('.modal-close');
modal.outModal();


document.getElementById('save').addEventListener('click', readFieldsForm);
document.getElementById('select-type-transaction').addEventListener('change', checkSelectForm);

// document.getElementById('select-category-transaction').querySelector('.active').addEventListener('click', getCategoryForm);

updateTable();