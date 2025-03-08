const formDialog = document.getElementById("form-dialog");
const openButton = document.getElementById("open-form");
const closeButton = document.getElementById("close-form");

openButton.addEventListener("click", () => {
  formDialog.showModal();
});

closeButton.addEventListener("click", () => {
  formDialog.close();
});
