class Transaction {
  constructor(date, description, value, type, category) {
    this.date = date,
    this.description = description;
    this.value = value;
    this.type = type;
    this.category = category;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getValue() {
    return this.value;
  }

  getCategory() {
    return this.category;
  }

  getType() {
    return this.type;
  }

  getDate() {
    return this.date;
  }

}

export default Transaction;