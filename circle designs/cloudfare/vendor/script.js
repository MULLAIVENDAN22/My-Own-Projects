const userDetails = [
  {
    id: 1,
    name: "test",
    address: "india",
    contact: "test",
    email: "test@test.com",
    phone: "1234567890",
    items: ["Product", "Product Item", "Test", "Test Item"],
    status: "Active",
  },
];

const id = [1];

const tbody = document.querySelector("tbody");

function adduser(obj) {
  tbody.innerHTML += ` <tr class = "user">
                          <td>${obj.id}</td>
                          <td>${obj.name}</td>
                          <td>${obj.contact}</td>
                          <td>${obj.email}</td>
                          <td>${obj.phone}</td>
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
  const form = document.querySelector("form");
  form.reset();
}

function userStatus(status) {
  return status.toLowerCase() == "active" ? " active" : " inactive";
}

function display() {
  userDetails.forEach((element) => {
    adduser(element);
  });
}
display();

const edited = [false, -1];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deletebtn(e.target);
  }
  if (e.target.classList.contains("edit")) {
    editbtn(e.target);
  }
});

function deletebtn(e) {
  const user = e.closest(".user");
  const td = user.querySelectorAll("td");
  userDetails.forEach((element, index) => {
    if (element.id == td[0].textContent) {
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

function createUser() {
  console.log("created");

  const warning = document.querySelector(".warning");
  const checkbox = document.querySelectorAll(".btn-check");
  let count = 0;
  for (let element of checkbox) {
    if (element.checked) {
      count++;
    }
  }

  if (count <= 0) {
    warning.classList.toggle("d-none");
    warning.children[0].innerHTML = ` <h6 class="fw-bold pb-2">CheckBox is Not selected</h6>`;
    return;
  }
  if (edited[0]) {
    console.log("editied is used", edited);
    const checkboxArray = [];
    checkbox.forEach((element) => {
      if (element.checked) {
        checkboxArray.push(element.value);
      }
    });
    const user = {
      id: userDetails[edited[1]].id,
      name: document.querySelector("#name").value,
      contact: document.querySelector("#contact").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      status: document.querySelector("#status").value,
      item: checkboxArray,
      address: document.querySelector("#address").value,
    };
    console.log(user);

    userDetails[edited[1]] = user;
    edited[0] = false;
    tbody.innerHTML = "";
    display();
  } else {
    id[0]++;

    const checkboxArray = [];
    checkbox.forEach((element) => {
      if (element.checked) {
        checkboxArray.push(element.value);
      }
    });

    const user = {
      id: id[0],
      name: document.querySelector("#name").value,
      contact: document.querySelector("#contact").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      status: document.querySelector("#status").value,
      address: document.querySelector("#address").value,
      item: checkboxArray,
    };
    userDetails.push(user);
    console.log(userDetails);
    adduser(user);
  }
  console.log(userDetails);
  warning.classList.toggle("d-none");
  backToUser();
}

function editbtn(e) {
  const user = e.closest(".user");
  const td = user.querySelectorAll("td");
  userDetails.forEach((element, index) => {
    if (element.id == td[0].textContent) {
      editUser(user, index);
      return;
    }
  });
}

function editUser(user, index) {
  newUser();
  document.querySelector("#name").value = userDetails[index].name;
  document.querySelector("#contact").value = userDetails[index].contact;
  document.querySelector("#email").value = userDetails[index].email;
  document.querySelector("#phone").value = userDetails[index].phone;
  document.querySelector("#address").value = userDetails[index].address;
  edited[0] = true;
  edited[1] = index;
  console.log(edited);
}
