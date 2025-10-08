const mainImgArray = [
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men.png",
  "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/home-banner/media-men2.png",
];

const mininavArray = [
  {
    img: "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/product/pic1.png",
    h6: "Collar Regular Fit T-Shirt",
    h5: "$4.00",
    span: "$70.00",
    type: "shirt",
  },
  {
    img: "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/product/pic2.png",
    h6: "Men's Wonder Shoes",
    h5: "$8.00 ",
    span: "$12.00",
    type: "shoe",
  },
  {
    img: "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/product/pic3.png",
    h6: "Collar Regular Fit T-Shirt",
    h5: "$4.00",
    span: "",
    type: "shirt",
  },
  {
    img: "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/product/pic4.png",
    h6: "Men's Wonder Watch",
    h5: "$8.00 ",
    span: "$12.00",
    type: "watch",
  },
  {
    img: "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/product/pic5.png",
    h6: "Men's Wonder Blazer",
    h5: "$6.00",
    span: "$12.00",
    type: "blazer",
  },
  {
    img: "https://motaadmin.dexignlab.com/codeigniter/demo/public/assets/frontend/images/product/pic6.png",
    h6: "Collar Regular Fit T-Shirt",
    h5: "$6.00",
    span: "",
    type: "bag",
  },
];

let mainImgCount = [0];
document.addEventListener("DOMContentLoaded", () => {
  mininavArray.forEach((value) => {
    handle(value);
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
