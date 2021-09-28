export default function getStringDate() {
  let date = new Date();
  return date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}