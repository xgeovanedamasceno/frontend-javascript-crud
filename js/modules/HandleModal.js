export default class HandleModal {
  constructor(modal, attribute) {
    this.modal = modal;
    this.attribute = attribute;

    this.show = this.show.bind(this);
    this.hidden = this.hidden.bind(this);


  }

  show(e) {
    e.preventDefault();
    console.log(this.modal);
    console.log(this.attribute);
    document.querySelector(this.modal).classList.add(this.attribute);
  }

  hidden(e) {
    e.preventDefault();
    document.querySelector(this.modal).classList.remove(this.attribute);
  }

  open(listener) {
    console.log(listener);
    console.log(this.modal);
    console.log(this.attribute);
    document.querySelector(listener).addEventListener('click', this.show);
  }

  close(listener) {
    document.querySelector(listener).addEventListener('click', this.hidden);
  }
  
  outModalClose() {
    document.querySelector(this.modal).addEventListener('click', this.hidden);
    
  }

  
  
 
}  