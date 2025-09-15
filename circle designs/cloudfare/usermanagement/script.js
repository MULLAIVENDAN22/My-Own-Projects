const userDetails = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "password",
    fullname: "System Administrator",
    role: "Admin",
    status: "Active",
    delete: false,
  },
  {
    id: 2,
    username: "dummyadmin",
    email: "dummyadmin@example.com",
    password: "password",
    fullname: "System Administrator",
    role: "Super User",
    status: "Active",
    delete: true,
  },
];

const tbody = document.querySelector("tbody");
const id = [2];

const set = new Set([userDetails[0].username, userDetails[1].username]);

function adduser(obj) {
  tbody.innerHTML += `
    <tr class="user">
      <td>${obj.id}</td>
      <td>${obj.username}</td>
      <td>${obj.fullname}</td>
      <td>${obj.email}</td>
      <td>${obj.role}</td>
      <td>
        <button
          type="button"
          class="text-light active px-2 py-1 fw-semibold ${userStatus(obj.status)}"
          style="border: none; border-radius: 5px"
        >
          ${obj.status}
        </button>
      </td>
      <td class="px-4">${btndecide(obj.delete)}</td>
    </tr>
  `;
}

function userStatus(status) {
  return status.toLowerCase() == "active" ? " active" : " inactive";
}

function btndecide(action) {
  console.log(action, typeof action);

  return action
    ? `<button type="button" class="btn btn-primary edit me-2 fw-medium">
                              Edit
                            </button>
         <button type="button" class="btn btn-danger delete fw-medium">
                              Delete
                            </button>`
    : `<button type="button" class="btn btn-primary edit fw-medium" >
                              Edit
                            </button>
        `;
}

function display() {
  userDetails.forEach((element) => {
    adduser(element);
  });
}
display();

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

const edited = [false, -1];

function createUser() {
  const warning = document.querySelector(".warning");
  if (
    document.querySelector("#password").value !=
    document.querySelector("#cpassword").value
  ) {
    warning.classList.toggle("d-none");
    warning.children[0].innerHTML = ` <h6 class="fw-bold pb-2">Password does not match with the Conform Password</h6>`;
    return;
  }

  if (edited[0]) {
    console.log("editied is used", edited);

    const user = {
      id: userDetails[edited[1]].id,
      username: document.querySelector("#username").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      fullname: document.querySelector("#cpassword").value,
      role: document.querySelector("#role").value,
      status: document.querySelector("#status").value,
      delete: document.querySelector("#role").value == "Admin" ? false : true,
    };
    set.delete(userDetails[edited[1]].username);
    set.add(user.username);
    userDetails.splice(edited[1], 1, user);
    edited[0] = false;
    tbody.innerHTML = "";
    display();
  } else {
    if (set.has(document.querySelector("#username").value)) {
      warning.classList.toggle("d-none");
      warning.children[0].innerHTML = ` <h6 class="fw-bold pb-2">Username already exist</h6>`;
      return;
    }
    id[0]++;
    const user = {
      id: id[0],
      username: document.querySelector("#username").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      fullname: document.querySelector("#cpassword").value,
      role: document.querySelector("#role").value,
      status: document.querySelector("#status").value,
      delete: document.querySelector("#role").value == "Admin" ? false : true,
    };
    userDetails.push(user);
    set.add(user.username);
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
    if (element.id == td[0].textContent) {
      editUser(user, index);
      return;
    }
  });
}

function editUser(user, index) {
  newUser();

  document.querySelector("#username").value = userDetails[index].username;
  document.querySelector("#email").value = userDetails[index].email;
  document.querySelector("#password").value = userDetails[index].password;
  document.querySelector("#cpassword").value = userDetails[index].password;
  document.querySelector("#fullname").value = userDetails[index].fullname;

  edited[0] = true;
  edited[1] = index;
  console.log(edited);
}
