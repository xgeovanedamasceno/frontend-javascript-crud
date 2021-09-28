import HandleStorage from "./HandleStorage.js";
import showTransaction from "./showTransaction.js";

export default function updateTable() {
  const storage = new HandleStorage();
  const transactions = storage.read();
  transactions.forEach(showTransaction);
}