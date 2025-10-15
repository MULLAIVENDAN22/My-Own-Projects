const mainImgArray = [
  "https://bizmax-wp.laralink.com/wp-content/uploads/2023/09/hero_slider_1.jpeg",
  "https://bizmax-wp.laralink.com/wp-content/uploads/2023/09/hero_slider_2.jpeg",
  "https://bizmax-wp.laralink.com/wp-content/uploads/2023/09/hero_slider_3.jpeg",
];

let mainImgCount = [0];
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".arrow-left").addEventListener("click", () => {
    console.log("before count", mainImgCount[0]);

    if (mainImgCount[0] == 0) {
      mainImgCount[0] = mainImgArray.length - 1;
    } else {
      mainImgCount[0]--;
    }
    console.log("after count", mainImgCount[0]);
    document
      .querySelector(".backImg")
      .setAttribute("src", mainImgArray[mainImgCount[0]]);
  });
  document.querySelector(".arrow-right").addEventListener("click", () => {
    console.log("before count", mainImgCount[0]);
    if (mainImgCount[0] + 1 >= mainImgArray.length) {
      mainImgCount[0] = 0;
    } else {
      mainImgCount[0]++;
    }
    console.log("after count", mainImgCount[0]);
    document
      .querySelector(".backImg")
      .setAttribute("src", mainImgArray[mainImgCount[0]]);
  });
});





var splide = new Splide( '.splide', {
  type   : 'loop',
  perPage: 4,
  perMove: 1,
} );

splide.mount();