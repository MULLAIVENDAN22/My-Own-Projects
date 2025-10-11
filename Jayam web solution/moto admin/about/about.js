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
  window.location.href = "../index.html";
});

let mininavArray;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://dummyjson.com/c/811b-f8f0-4b2e-ada1");
    const data = await response.json();
    console.log(data.products);
    mininavArray = data.products;
  } catch (error) {
    console.log(error);
  }

  mininavArray.forEach((value) => {
    handle(value);
  });
});

const mininav = document.querySelector(".mini-nav");
mininav.querySelectorAll("a").forEach((value) => {
  value.addEventListener("click", (e) => {
    mininav.querySelectorAll("a").forEach((val) => {
      if (val.classList.contains("mini-nav-a"))
        val.classList.remove("mini-nav-a");
    });
    navHandle(e.target);
  });
});

const mininavcards = document.querySelector(".mini-nav-cards");
function navHandle(e) {
  e.classList.add("mini-nav-a");

  mininavcards.innerHTML = "";
  if (e.textContent.toLowerCase() == "all") {
    mininavArray.forEach((value) => {
      handle(value);
    });
  } else {
    mininavArray.forEach((value) => {
      if (e.textContent.toLowerCase() == value.type) {
        handle(value);
      }
    });
  }
}
function handle(val) {
  mininavcards.innerHTML += `
    <div
              class="cards d-flex flex-column align-items-center my-2"
              style="width: 31%"
            >
              <div
                class="d-flex justify-content-center align-items-center p-5"
                style="background-color: #EAE9E9"
              >
                <img
                  class="img-fluid"
                  src="${val.img}"
                  alt=""
                  style="object-fit: cover"
                />
              </div>
              <h6 class="my-3">${val.h6}</h6>
              <h5 style="color: #3a7afe">
                ${val.h5}
                <span
                  class="ms-3"
                  style="text-decoration: line-through; color: #a5c2ff"
                >
                ${val.span}  </span
                >
              </h5>
            </div>
    `;
}
