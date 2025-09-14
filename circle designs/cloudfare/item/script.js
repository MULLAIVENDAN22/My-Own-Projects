const userDetails = [
  {
    Code: "As123",
    name: "Product",
    category: "General",
    stock: "Available Stock",
    date: "09 Apr 2025",
    menu: "M1 - Maintenance items - Level 1",
    description: "admin",
    status: "active",
  },
  
];

const tbody = document.querySelector("tbody");

const set = new Set([userDetails[0].username, userDetails[1].username]);

function adduser(obj) {
  tbody.innerHTML += ` <tr class = "user">
                          <td>${obj.Code}</td>
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
  return status == "active" ? " active" : " inactive";
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

userDetails.forEach((element) => {
  adduser(element);
});

const deletebtn = document.querySelectorAll(".delete");
console.log(deletebtn);

deletebtn.forEach((value) => {
  value.addEventListener("click", (e) => {
    console.log("delete is clicked");
    const user = e.target.closest(".user");
    const td = user.querySelectorAll("td");
    userDetails.forEach((element, index) => {
      if (element.id == td[0].textContent) {
        userDetails.splice(index, 1);
        user.remove();
        console.log(userDetails);
        return;
      }
    });
  });
});

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
    adduser(userDetails[edited[1]]);
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

const editbtn = document.querySelectorAll(".edit");
editbtn.forEach((value) => {
  value.addEventListener("click", (e) => {
    console.log("edit is clicked");
    const user = e.target.closest(".user");
    const td = user.querySelectorAll("td");
    userDetails.forEach((element, index) => {
      if (element.id == td[0].textContent) {
        editUser(user, index);
        return;
      }
    });
  });
});

function editUser(user, index) {
  newUser();

  document.querySelector("#username").value = userDetails[index].username;
  document.querySelector("#email").value = userDetails[index].email;
  document.querySelector("#password").value = userDetails[index].password;
  document.querySelector("#cpassword").value = userDetails[index].password;
  document.querySelector("#fname").value = userDetails[index].fullname;
  user.remove();
  edited[0] = true;
  edited[1] = index;
  console.log(edited);
}
