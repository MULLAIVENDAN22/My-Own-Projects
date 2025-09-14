const userDetails = [
  {
    name: "General",
    description: "General category",
    created: "System Administrator",
    status: "active",
  },
];

const tbody = document.querySelector("tbody");

function adduser(obj) {
  tbody.innerHTML += ` <tr class = "user">
                          <td>${obj.name}</td>
                          <td>${obj.description}</td>
                          <td>${obj.created}</td>
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
  return status == "active" ? " active" : " inactive";
}

userDetails.forEach((element) => {
  adduser(element);
});

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
    if (element.name == td[0].textContent) {
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

  if (edited[0]) {
    console.log("editied is used", edited);

    const user = {
      name: document.querySelector("#name").value,
      description: document.querySelector("#description").value,
      created: "System Administrator",
      status: document.querySelector("#status").value.toLowerCase(),
    };
    console.log(user);

    userDetails[edited[1]] = user;
    edited[0] = false;
    adduser(userDetails[edited[1]]);
  } else {
    const user = {
      name: document.querySelector("#name").value,
      description: document.querySelector("#description").value,
      created: "System Administrator",
      status: document.querySelector("#status").value.toLowerCase(),
    };
    userDetails.push(user);
    console.log(userDetails);
    adduser(user);
  }
  console.log(userDetails);
  backToUser();
}

function editbtn(e) {
  const user = e.closest(".user");
  const td = user.querySelectorAll("td");
  userDetails.forEach((element, index) => {
    if (element.name == td[0].textContent) {
      editUser(user, index);
      return;
    }
  });
}

function editUser(user, index) {
  newUser();
  document.querySelector("#name").value = userDetails[index].name;
  document.querySelector("#description").value = userDetails[index].description;

  user.remove();
  edited[0] = true;
  edited[1] = index;
  console.log(edited);
}
