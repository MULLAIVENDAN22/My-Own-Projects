const system = document.querySelector(".system");
const systemadmin = document.querySelector(".systemadmin");

system.addEventListener("click", (e) => {
  e.stopPropagation();
  systemadmin.classList.toggle("d-none");
});

document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("system") &&
    !e.target.classList.contains("systemadmin")
  ) {
    systemadmin.classList.add("d-none");
  }
});

const maincontent = document.querySelector(".maincontent");
const mainsidebar = document.querySelector(".mainsidebar");
const harmburderbtn = document.querySelector(".harmburderbtn");

harmburderbtn.addEventListener("click", () => {
  mainsidebar.classList.toggle("col-2");
  mainsidebar.classList.toggle("d-none");
  if (maincontent.classList.contains("col-10")) {
    maincontent.classList.remove("col-10");
    maincontent.classList.add("col-12");
  } else {
    maincontent.classList.add("col-10");
    maincontent.classList.remove("col-12");
  }
});

const signout = document.querySelector(".signout");
signout.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const navigation = [
  "purchase",
  "location",
  "vendor",
  "menucode",
  "item",
  "category",
  "usermanagement",
  "dashboard",
];

navigation.forEach((value) => {
  document.querySelector("." + value).addEventListener("click", () => {
    window.location.href = `../${value}/index.html`;
  });
});
