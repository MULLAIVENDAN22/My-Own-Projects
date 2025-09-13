const userDetails = {
  username: "admin",
  password: "password",
};

document.querySelector("button").addEventListener("click", () => {
  const input = document.querySelectorAll("input");
  if (input[0].value == "") {
    input[0].reportValidity();
    return;
  }
  if (input[1].value == "") {
    input[1].reportValidity();
    return;
  }
  if (
    input[0].value.toLocaleLowerCase() == userDetails.username &&
    input[1].value.toLocaleLowerCase() == userDetails.password
  ) {
    window.document.location.href = "./dashboard/index.html";
  } else {
    document.querySelector(".verify").classList.remove("d-none");
    setTimeout(() => {
      document.querySelector(".verify").classList.add("d-none");
    }, 2000);
  }
});
