const mainImgArray = [
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men.png",
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men2.png",
];

const getUserAccount = JSON.parse(
  window.localStorage.getItem("userAccount" || "[]")
);
if (!getUserAccount.some((element) => element.status == true)) {
  window.location.replace("../index.html");
}

let currentUserIndex = -1;
const currentUser = document.querySelectorAll(".currentUserAccount");
getUserAccount.forEach((element, index) => {
  if (element.status == true) {
    currentUserIndex = index;
    currentUser[0].innerHTML = `HI, ${element.username.toUpperCase()}`;
    currentUser[1].innerHTML = `HI, ${element.username.toUpperCase()}`;
    return;
  }
});

const tbody = document.querySelector("tbody");
let empty = true;
getUserAccount.forEach((element, index) => {
  if (window.localStorage.getItem(element.username)) {
    empty = false;
    tbody.innerHTML += `
              <tr>
                <td class="p-3">${element.username}</td>
                <td class="p-2">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    required
                  >
                    <option value="ordered" selected>Ordered</option>
                    <option value="shipped">Shipped</option>
                    <option value="out">Out For Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td class="p-3">
                  <input type="date" required/>
                </td>
              </tr>
              `;
  }
});
if (empty) {
  tbody.innerHTML = `
               <tr>
                <td class="p-3 fw-semibold fs-3" colspan="3">No one ordered yet</td>
                
              </tr>`;
  document.querySelector(".update").classList.add("d-none");
} else {
  document.querySelector(".update").classList.remove("d-none");
}

function update() {
  const tr = tbody.querySelectorAll("tr");
  console.log("update clicked");

  [...tr].forEach((element) => {
    const select = element.children[1].querySelector("select");
    const input = element.children[2].querySelector("input");
    if (!select.checkValidity()) {
      select.reportValidity();
      return;
    }
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    getUserAccount.forEach((value, index) => {
      if (value.username == element.children[0].textContent) {
        console.log(
          element.children[0].textContent,
          value.username,
          value.username == element.children[0].textContent
        );

        getUserAccount[index].delivery = {
          progress: select.value,
          date: input.value,
        };
      }
    });
  });
  window.localStorage.setItem("userAccount", JSON.stringify(getUserAccount));
  console.log("order update successfull");
}

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
