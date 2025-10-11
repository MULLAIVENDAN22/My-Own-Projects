const userAccount = [
  {
    username: "admin",
    password: "password",
    status: false,
  },
];
window.localStorage.setItem("userAccount", JSON.stringify(userAccount));
const getUserAccount = JSON.parse(
  window.localStorage.getItem("userAccount" || "[]")
);
if (getUserAccount) {
  getUserAccount.forEach((element) => {
    if (element.status == true) {
      window.location.replace("./home/index.html");
    }
  });
}

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

  getUserAccount.forEach((element, index) => {
    if (
      input[0].value.toLocaleLowerCase() == element.username &&
      input[1].value.toLocaleLowerCase() == element.password
    ) {
      getUserAccount[index].status = true;
      window.localStorage.setItem(
        "userAccount",
        JSON.stringify(getUserAccount)
      );
      window.document.location.href = "./home/index.html";
    } else {
      document.querySelector(".verify").classList.remove("d-none");
      setTimeout(() => {
        document.querySelector(".verify").classList.add("d-none");
      }, 2500);
    }
  });
});
