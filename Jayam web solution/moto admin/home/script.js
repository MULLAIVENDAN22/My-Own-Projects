const mainImgArray = [
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men.png",
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men2.png",
];

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

let mainImgCount = [0];
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".main-img")
    .setAttribute("src", mainImgArray[mainImgCount[0]]);
  document.querySelectorAll(".main-arrow")[1].addEventListener("click", () => {
    if (!(mainImgCount[0] + 1 < mainImgArray.length)) {
      return;
    } else {
      mainImgCount[0]++;
      document
        .querySelector(".main-img")
        .setAttribute("src", mainImgArray[mainImgCount[0]]);
    }
  });
  document.querySelectorAll(".main-arrow")[0].addEventListener("click", () => {
    if (!(mainImgCount[0] - 1 > -1)) {
      return;
    } else {
      mainImgCount[0]--;
      document
        .querySelector(".main-img")
        .setAttribute("src", mainImgArray[mainImgCount[0]]);
    }
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

function disabled(val) {
  return Number(val.stock) < 1 ? "disabled" : "";
}
function handle(val) {
  mininavcards.innerHTML += `
    <div
              class="cards position-relative d-flex flex-column align-items-center my-2"
              style="width: 31%"
              data-id = ${val.id}
            >
              <div
                class="d-flex justify-content-center align-items-center p-5"
                style="background-color: #EAE9E9"
              >
              <div class="position-absolute p-4" style="top: 0px; right: 0px; z-index: 3;">
                <i class="fa-solid fa-heart fs-4 wishlist" style="color: #6f6f6f;"></i>
              </div>

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
              <div class="d-flex flex-row align-item-center" style="gap: 20%">
              <h5 class="fw-medium text-primary pt-2" style="white-space: nowrap;">${val.stock} left</h5>
              <div>
                <button class="btn btn-secondary shop-icon fs-5 fw-semibold"  ${disabled(val)}>
                  <i class="fa-solid fa-cart-shopping "></i>
                </button>
              </div>
            </div>
            </div>
    `;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist")) {
    console.log("wish clicked");
    wishlist(e.target);
  }
  if (e.target.closest(".shop-icon")) {
    console.log("shop-icon clicked");
    shopIcon(e.target);
  }
});

function wishlist(e) {
  e.classList.toggle("wish-active");
  mininavArray[e.closest(".cards").dataset.id].wishlist =
    !mininavArray[e.closest(".cards").dataset.id].wishlist;
  console.log(mininavArray);
  window.localStorage.setItem(
    getUserAccount[currentUserIndex].username,
    JSON.stringify(mininavArray)
  );
}

function shopIcon(e) {
  if (
    Number(mininavArray[e.closest(".cards").dataset.id].count) >
    Number(mininavArray[e.closest(".cards").dataset.id].stock) - 1
  ) {
    return;
  }
  if (!e.classList.contains("shop-icon")) {
    e = e.closest(".shop-icon");
  }
  const img = e.innerHTML;
  mininavArray[e.closest(".cards").dataset.id].count =
    parseInt(mininavArray[e.closest(".cards").dataset.id].count) + 1;
  e.innerHTML = `${mininavArray[e.closest(".cards").dataset.id].count}`;
  setTimeout(() => {
    e.innerHTML = img;
  }, 500);
  console.log(mininavArray);
  window.localStorage.setItem(
    getUserAccount[currentUserIndex].username,
    JSON.stringify(mininavArray)
  );
}
