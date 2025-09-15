const userDetails = [
  {
    lname: "Location 01110",
    address: "test",
    email: "testing@test.com",
    phone: "1234567890",
    username: "admin",
    password: "22222",
    status: "Active",
  },
];

const tbody = document.querySelector("tbody");

function adduser(obj) {
  tbody.innerHTML += ` <tr class = "user">
                          <td>${obj.lname}</td>
                          <td>${obj.address}</td>
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
    if (element.lname == td[0].textContent) {
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
  if (
    document.querySelector("#password").value !=
    document.querySelector("#cpassword").value
  ) {
    warning.classList.toggle("d-none");
    warning.children[0].innerHTML = ` <h6 class="fw-bold pb-2">Password does not match with the Conform Password</h6>`;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  if (edited[0]) {
    console.log("editied is used", edited);
    if (warning.classList.contains("d-none")) {
      warning.classList.toggle("d-none");
    }

    const user = {
      lname: document.querySelector("#lname").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      status: document.querySelector("#status").value,
      address: document.querySelector("#address").value,
      password: document.querySelector("#password").value,
      username: document.querySelector("#username").value,
    };
    console.log(user);
    userDetails[edited[1]] = user;
    edited[0] = false;
    tbody.innerHTML = "";
    display();
  } else {
    const user = {
      lname: document.querySelector("#lname").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      status: document.querySelector("#status").value,
      address: document.querySelector("#address").value,
      password: document.querySelector("#password").value,
      username: document.querySelector("#username").value,
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
    if (element.lname == td[0].textContent) {
      editUser(user, index);
      return;
    }
  });
}

function editUser(user, index) {
  newUser();
  document.querySelector("#lname").value = userDetails[index].lname;
  document.querySelector("#username").value = userDetails[index].username;
  document.querySelector("#email").value = userDetails[index].email;
  document.querySelector("#phone").value = userDetails[index].phone;
  document.querySelector("#address").value = userDetails[index].address;
  document.querySelector("#password").value = userDetails[index].password;
  document.querySelector("#cpassword").value = userDetails[index].password;
  edited[0] = true;
  edited[1] = index;
  console.log(edited);
}
