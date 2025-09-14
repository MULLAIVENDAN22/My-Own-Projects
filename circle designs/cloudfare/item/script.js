const userDetails = [
  {
    code: "As123",
    name: "Product",
    category: "General",
    stock: "109.00",
    date: "2025-04-09",
    menu: "M1 - Maintenance items - Level 1",
    description: "admin",
    status: "Active",
  },
  {
    code: "GEN0001",
    name: "test",
    category: "General",
    stock: "34.00",
    date: "2025-03-24",
    menu: "M2 - Maintenance items - Level 2",
    description: "admin",
    status: "Active",
  },
];

const tbody = document.querySelector("tbody");

const set = new Set([userDetails[0].code, userDetails[1].code]);

function adduser(obj) {
  tbody.innerHTML += ` <tr class = "user">
                          <td>${obj.code}</td>
                          <td>${obj.name}</td>
                          <td>${obj.category}</td>
                          <td>${obj.stock}</td>
                          <td>${obj.date}</td>
                            <td>
                            <button type="button" class="text-light active px-2 py-1 fw-semibold ${userStatus(obj.status)}"
                             style="border: none; border-radius: 5px">
                              ${obj.status}
                            </button>
                          </td>
                           <td class="px-4">
                            <button type="button" class="btn btn-primary edit me-2 fw-medium">Edit</button>
                            <button type="button" class="btn btn-danger delete fw-medium">Delete</button>
                          </td>
                        </tr>`;
}

function userStatus(status) {
  return status.toLowerCase() == "active" ? " active" : " inactive";
}

userDetails.forEach((element) => {
  adduser(element);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deletebtn(e.target);
  }
  if (e.target.classList.contains("edit")) {
    editbtn(e.target);
  }
});

function deletebtn(e) {
  console.log("delete is clicked");
  const user = e.closest(".user");
  const td = user.querySelectorAll("td");
  userDetails.forEach((element, index) => {
    if (element.code == td[0].textContent) {
      userDetails.splice(index, 1);
      user.remove();
      console.log(userDetails);
      return;
    }
  });
}

const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
function newUser() {
  card1.classList.toggle("d-none");
  card2.classList.toggle("d-none");
}
function backToUser() {
  card1.classList.toggle("d-none");
  card2.classList.toggle("d-none");
}

const edited = [false, -1];

function createUser() {
  const warning = document.querySelector(".warning");

  if (edited[0]) {
    console.log("editied is used", edited);

    const user = {
      code: document.querySelector("#code").value,
      name: document.querySelector("#name").value,
      category: document.querySelector("#category").value,
      stock: document.querySelector("#stock").value,
      date: document.querySelector("#date").value,
      status: document.querySelector("#status").value,
      menu: document.querySelector("#menu").value,
      description: document.querySelector("#description").value,
    };
    set.delete(userDetails[edited[1]].code);
    set.add(user.code);
    userDetails[edited[1]] = user;
    edited[0] = false;
    adduser(userDetails[edited[1]]);
  } else {
    if (set.has(document.querySelector("#code").value)) {
      warning.classList.toggle("d-none");
      warning.children[0].innerHTML = ` <h6 class="fw-bold pb-2">Username already exist</h6>`;
      return;
    }
    const user = {
      code: document.querySelector("#code").value,
      name: document.querySelector("#name").value,
      category: document.querySelector("#category").value,
      stock: document.querySelector("#stock").value,
      date: document.querySelector("#date").value,
      status: document.querySelector("#status").value,
      menu: document.querySelector("#menu").value,
      description: document.querySelector("#description").value,
    };
    userDetails.push(user);
    set.add(user.code);
    adduser(user);
  }

  backToUser();
  console.log(userDetails);
}

function editbtn(e) {
  console.log("edit is clicked");
  const user = e.closest(".user");
  const td = user.querySelectorAll("td");
  userDetails.forEach((element, index) => {
    if (element.code == td[0].textContent) {
      editUser(user, index);
      return;
    }
  });
}

function editUser(user, index) {
  newUser();

  document.querySelector("#code").value = userDetails[index].code;
  document.querySelector("#name").value = userDetails[index].name;
  document.querySelector("#stock").value = userDetails[index].stock;
  document.querySelector("#date").value = userDetails[index].date;
  document.querySelector("#description").value = userDetails[index].description;

  user.remove();
  edited[0] = true;
  edited[1] = index;
  console.log(edited);
}
