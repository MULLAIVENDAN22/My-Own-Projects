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

const tbody = document.querySelector("tbody");

const currentUserShopping = JSON.parse(
  window.localStorage.getItem(getUserAccount[currentUserIndex].username || "[]")
);
console.log(currentUserShopping);

if (currentUserShopping) {
  document.querySelector(".orderProgress").classList.remove("d-none");
  let total = 0;
  currentUserShopping.forEach((element, index) => {
    if (element.count > 0) {
      total +=
        parseFloat(element.count) *
        parseFloat(element.h5.split("").splice(1).join());

      tbody.innerHTML += `
    <tr>
                <td style="width: 20%">
                  <div>
                    <img
                      src="${element.img}"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      style="height: 110px; width: 110px"
                    />
                  </div>
                </td>
                <td>
                  <div class="p-4">
                    <h5 class="fw-medium">${element.h6}</h5>
                    <h6 class="text-secondary fw-semibold">${element.type}</h6>
                  </div>
                </td>
                <td>
                  <div class="" style="padding: 35px">
                    <h5 class="fw-medium">${element.count}</h5>
                  </div>
                </td>
                <td>
                  <div class="" style="padding: 35px">
                    <h5 class="fw-medium">${element.h5}</h5>
                  </div>
                </td>
              </tr>`;
    }
  });
  tbody.innerHTML += `<tr>
                        <td colspan="3"><h5 class="fw-medium p-2">Total</h5></td>
                        <td><h5 class="fw-medium p-2">$${total}</h5></td>
                    </tr>`;
} else {
  document.querySelector(".orderProgress").classList.add("d-none");
  tbody.innerHTML = `<tr>
                        <td colspan="4">
                        <h5 class="fs-medium p-3">Your Cart Is Empty</h5>
                        </td>
                    </tr>`;
}

const deliveryStatus = new Map();
deliveryStatus.set("ordered", "11%");
deliveryStatus.set("shipped", "36%");
deliveryStatus.set("out", "61%");
deliveryStatus.set("delivered", "100%");
console.log(deliveryStatus);

if (getUserAccount[currentUserIndex]?.delivery) {
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width =
    deliveryStatus.get(getUserAccount[currentUserIndex].delivery?.progress) ||
    "12%";
  document.querySelector(".orderDate").innerHTML =
    `Your Order Will Be Delivered on ${getUserAccount[currentUserIndex].delivery?.date}`;
}
