const mainImgArray = [
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men.png",
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men2.png",
];

let currentUserIndex = -1;
const getUserAccount = JSON.parse(
  window.localStorage.getItem("userAccount" || "[]")
);
if (!getUserAccount.some((element) => element.status == true)) {
  window.location.replace("../index.html");
}

const currentUser = document.querySelectorAll(".currentUserAccount");
getUserAccount.forEach((element, index) => {
  if (element.status == true) {
    currentUserIndex = index;
    currentUser[0].innerHTML = `HI, ${element.username.toUpperCase()}`;
    currentUser[1].innerHTML = `HI, ${element.username.toUpperCase()}`;
    return;
  }
});

const profile = document.querySelector(".profile");
profile.addEventListener("click", () => {
  document.querySelector(".profile-action").classList.toggle("d-none");
});

const signout = document.querySelector(".signout");
signout.addEventListener("click", () => {
  document.querySelector(".profile-action").classList.toggle("d-none");
  getUserAccount[currentUserIndex].status = false;
  window.localStorage.setItem("userAccount", JSON.stringify(getUserAccount));
  window.location.href = "../../index.html";
});

const checkbox1 = document.querySelector("#radioDefault1");

checkbox1.addEventListener("change", () => {
  if (checkbox1.checked) {
    document.querySelector("#radioDefault2").checked = false;
  }
});
const checkbox2 = document.querySelector("#radioDefault2");

checkbox1.addEventListener("change", () => {
  if (checkbox2.checked) {
    document.querySelector("#radioDefault2").checked = false;
  }
});

function finalCheckout() {
  const radiobtn = document.querySelectorAll(".radiobtn");

  if (![...radiobtn].some((element) => element.checked)) {
    return;
  } else if (radiobtn[0].checked) {
    window.location.href = "../payment/index.html";
    return;
  }

  const newAddress = document.querySelector(".newAddress");
  const inputs = newAddress.querySelectorAll("input[required]");
  let allValid = true;

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.reportValidity();
      allValid = false;
    }
  });

  if (allValid) {
    console.log("All inputs valid");
    window.location.href = "../payment/index.html";
  }
}
