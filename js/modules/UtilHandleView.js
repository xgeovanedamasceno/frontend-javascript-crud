export default class UtilHandleView {
  getStringDate() {
    let date = new Date();
    return date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }

  areFieldsValid() {
    return document.getElementById('form-dash').reportValidity();
  }
}