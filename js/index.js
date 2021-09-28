import setModal from "./modules/setModal.js";
import readFieldsForm from "./readFieldsForms.js";


setModal();


document.getElementById('save').addEventListener('click', readFieldsForm);