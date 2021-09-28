class Modal {

  constructor(openButton, closeButton, outClose) {
    this.openButton = document.querySelector(openButton);
    this.closeButtons = document.querySelectorAll(closeButton);
    this.outModal = document.querySelector(outClose);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.outCloseModal = this.outCloseModal.bind(this);
  }

  show() {
    console.log('modal');
  }

  openModal(e) {
    e.preventDefault();
    console.log(e);
    document.querySelector('.modal').classList.add('active');
  }
  
  closeModal(e) {
    e.preventDefault();
    console.log(e);
    document.querySelector('.modal').classList.remove('active');
  }
  
  outCloseModal(event) {
    event.preventDefault();
    if (event.target === this.outModal) this.closeModal(event);
  }


  setEvents() {
    this.openButton.addEventListener('click', this.openModal);
    this.closeButtons.forEach(button => {
      button.addEventListener('click', this.closeModal);
    });
    this.outModal.addEventListener('click', this.outCloseModal);
  }
 
}

export default Modal;

// class Modal {
//   constructor(openButton, closeButton, modalContent) {
//     this.openButton = document.querySelector(openButton);
//     this.closeButtons = document.querySelectorAll(closeButton);
//     this.modalContent = document.querySelector(modalContent);

//     this.eventModal = this.eventModal.bind(this);
//     this.outCloseModal = this.eventModal.bind(this);

//   }

//   show() {
//     console.log('modal');
//   }

//   openModal(e) {
//     console.log(e.target);
//     document.querySelector('.modal').classList.add('active');
//   }
  
//   closeModal(e) {
//     e.preventDefault();
//     document.querySelector('.modal').classList.remove('active');
//   }
  
//   outCloseModal(event) {
//     event.preventDefault();
//     console.log(event.target.parentElement);
//     if (event.target === this.modalContent) this.closeModal();
//     console.log(this);
//   }

//   togglaModal() {
//     this.document.querySelector('.modal').classList.toggle('active');
//   }

//   eventModal(event) {
//     console.log(this);
//     event.preventDefault();
//     this.togglaModal();
//   }


//   setEvents() {
//     this.openButton.addEventListener('click', this.eventModal);
//     this.closeButtons.forEach(button => {
//       button.addEventListener('click', this.eventModal);
//     });
//     this.modalContent.addEventListener('click', this.outCloseModal);
//   }
 
// }

// export default Modal;
 
  