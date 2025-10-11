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

setTimeout(() => {
  const payment = document.querySelector(".payment");
  payment.innerHTML = `<div class="col-7 d-flex flex-row justify-content-center mt-2">
          <div>
            <svg
              width="180px"
              height="180px"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM7.0718 10.7106L11.3905 5.31232L10.6096 4.68762L6.92825 9.2893L4.32012 7.11586L3.67993 7.88408L7.0718 10.7106Z"
                  fill="#01CC50"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div class="col-7 d-flex flex-row justify-content-center mt-5">
          <div>
            <h2 class="fw-semibold">Payment Successfull</h2>
          </div>
        </div>
        <div class="col-12 mt-5 d-flex justify-content-center mt-5">
          <div class="">
            <button
              class="btn btn-primary fs-5 fw-semibold p-3"
              type="submit"
              onclick="window.location.href='../../home/index.html'"
            >
              Back To Home
            </button>
          </div>
        </div>`;
}, 6000);
