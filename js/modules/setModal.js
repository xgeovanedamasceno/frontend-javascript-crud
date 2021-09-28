export default function setModal() {

  function openModal(e) {
    e.preventDefault();
    document.querySelector('.modal').classList.add('active');
  }
  
  function closeModal(e) {
    e.preventDefault();
    document.querySelector('.modal').classList.remove('active');
  }
  
  function outModalClose(event) {
    event.preventDefault();
    if (event.target === this) closeModal(event);
  }

  document.querySelector('#new-transaction').addEventListener('click', openModal);
  document.querySelector('#modal-close').addEventListener('click', closeModal);
  document.querySelector('.modal').addEventListener('click',outModalClose);
 
}  