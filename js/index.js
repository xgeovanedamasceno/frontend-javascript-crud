import checkSelectForm from "./checkSelectForm.js";
import setModal from "./modules/setModal.js";
import readFieldsForm from "./readFieldsForms.js";


setModal();


document.getElementById('save').addEventListener('click', readFieldsForm);
document.getElementById('select-type-transaction').addEventListener('click', checkSelectForm);
