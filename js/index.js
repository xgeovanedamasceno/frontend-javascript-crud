import getCategoryForm from "./modules/getCategoryForm.js";
import checkSelectForm from "./modules/checkSelectForm.js";
import setModal from "./modules/setModal.js";
import readFieldsForm from "./modules/readFieldsForms.js";
import updateTable from "./modules/updateTable.js";




setModal();


document.getElementById('save').addEventListener('click', readFieldsForm);
document.getElementById('select-type-transaction').addEventListener('change', checkSelectForm);

document.getElementById('select-category-transaction').querySelector('.active').addEventListener('change', getCategoryForm);

updateTable();