import Modal from "./Modal.js";

const modal = new Modal('#new-transaction', ['#modal-close', '#save', '#cancel'],'.modal');
modal.setEvents();