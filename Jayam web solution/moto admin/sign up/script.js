const userAccount = [];
const getUserAccount = JSON.parse(window.localStorage.getItem("userAccount" || "[]"));
getUserAccount.forEach((element) => {
  if (element.status == true) {
    window.location.replace("./home/index.html");
  }
});

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

  let exist = false;
  getUserAccount.forEach((element) => {
    if (input[0].value.toLocaleLowerCase() == element.username) {
      exist = true;
      document.querySelector(".verify").classList.remove("d-none");
      setTimeout(() => {
        document.querySelector(".verify").classList.add("d-none");
      }, 2500);
    }
  });
  if (exist) {
    return;
  } else {
    const user = {
      username: input[0].value,
      password: input[1].value,
      status: active,
    };
    getUserAccount.push(user);
    console.log(getUserAccount);

    window.localStorage.setItem("userAccount", JSON.stringify(getUserAccount));
    window.document.location.href = "../home/index.html";
  }
});
