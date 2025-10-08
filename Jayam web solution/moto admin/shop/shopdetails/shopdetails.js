const taggle = document.querySelectorAll(".taggle h4");

const taggleAction = document.querySelectorAll(".taggleAction");

taggle[0].addEventListener("click", (e) => {
  console.log("spec clicked");

  taggle.forEach((value) => {
    if (value.classList.contains("underline")) {
      value.classList.remove("underline");
    }
  });
  e.target.classList.add("underline");

  if (taggleAction[0].classList.contains("d-none")) {
    taggleAction[0].classList.remove("d-none");
  }
  taggleAction[1].classList.add("d-none");
});

taggle[1].addEventListener("click", (e) => {
  console.log("reviews clicked");

  taggle.forEach((value) => {
    if (value.classList.contains("underline")) {
      value.classList.remove("underline");
    }
  });
  e.target.classList.add("underline");

  if (taggleAction[1].classList.contains("d-none")) {
    taggleAction[1].classList.remove("d-none");
  }
  taggleAction[0].classList.add("d-none");
});
