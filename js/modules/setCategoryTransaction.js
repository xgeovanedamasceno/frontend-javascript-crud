import { bufferTransaction } from "./objects/bufferTransaction.js";

export default function setCategoryTransaction(value) {
  bufferTransaction.category = value;
  console.log(bufferTransaction.category);
  console.log(value);
}