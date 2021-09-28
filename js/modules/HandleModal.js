export default class HandleModal {
  constructor(modal, attribute) {
    this.modal = modal;
    this.attribute = attribute;

    this.show = this.show.bind(this);
    this.hidden = this.hidden.bind(this);
    // this.outModalClose = this.outModalClose.bind(this);
    
    this.outModal = this.outModal.bind(this);

  }

  show(e) {
    document.querySelector(this.modal).classList.add(this.attribute);
  }

  hidden(e) {
    document.querySelector(this.modal).classList.remove(this.attribute);
  }

  outModalClose(e) {
    // console.log(this);
    // console.log(typeof this.modal);
    // console.log(this.outModal);
    // console.log(e.target);
    if (e.target === this) {
      console.log('resolve aqui');
    }
  }


  open(listener) {
    document.querySelector(listener).addEventListener('click', this.show);
  }

  close(listener) {
    document.querySelector(listener).addEventListener('click', this.hidden);
  }
  
  outModal() {
    document.querySelector(this.modal).addEventListener('click', this.outModalClose);
    
  }

  
  
 
}  