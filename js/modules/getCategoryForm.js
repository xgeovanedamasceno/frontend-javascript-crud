import setCategoryTransaction from "./setCategoryTransaction.js";

export default function getCategoryForm(e) {
  setCategoryTransaction(e.target.value);
}