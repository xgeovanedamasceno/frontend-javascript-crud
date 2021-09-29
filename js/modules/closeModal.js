export default function closeModal(e) {
  e.preventDefault();
  document.querySelector('.modal').classList.remove('active');
}