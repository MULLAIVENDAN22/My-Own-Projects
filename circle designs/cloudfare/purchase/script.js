const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
function change() {
  card1.classList.toggle("d-none");
  card2.classList.toggle("d-none");
}

function downloadFile() {
  const link = document.createElement("a");
  link.href = "./pdf/Purchase_Order_PO-20250411-5232.pdf";
  link.download = "./pdf/Purchase_Order_PO-20250411-5232.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
