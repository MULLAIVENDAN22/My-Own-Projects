const userDetails = [
  {
    id: 1,
    code: "M1",
    description: "Maintenance items - Level 1",
    created: "08 Apr 2025 11:35",
    status: "Active",
  },
  {
    id: 2,
    code: "M2",
    description: "Maintenance items - Level 2",
    created: "08 Apr 2025 11:35",
    status: "Active",
  },
];

const id = [2];

const tbody = document.querySelector("tbody");

function adduser(obj) {
  tbody.innerHTML += ` <tr class = "user">
                          <td>${obj.id}</td>
                          <td>${obj.code}</td>
                          <td>${obj.description}</td>
                          <td>
                            <button type="button" class="text-light active px-2 py-1 fw-semibold ${userStatus(obj.status)}"
                             style="border: none; border-radius: 5px">
                              ${obj.status}
                            </button>
                          </td>
                          <td>${obj.created}</td>
                           <td class="px-4">
                            <button type="button" class="btn btn-primary edit me-2 fw-medium">Edit</button>
                            <button type="button" class="btn btn-danger delete fw-medium">Delete</button>
                          </td>
                        </tr>`;
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

  if (edited[0]) {
    console.log("editied is used", edited);
    const date = new Date();
    const finalDate = date
      .toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
      .split(",")
      .join(" ");

    const user = {
      id: userDetails[edited[1]].id,
      code: document.querySelector("#code").value,
      description: document.querySelector("#description").value,
      created: finalDate,
      status: "Active",
    };
    console.log(user);

    userDetails[edited[1]] = user;
    edited[0] = false;
    tbody.innerHTML = "";
    display();
  } else {
    id[0]++;
    const date = new Date();
    const finalDate = date
      .toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
      .split(",")
      .join(" ");

    const user = {
      id: id[0],
      code: document.querySelector("#code").value,
      description: document.querySelector("#description").value,
      created: finalDate,
      status: "Active",
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
    if (element.id == td[0].textContent) {
      editUser(user, index);
      return;
    }
  });
}

function editUser(user, index) {
  newUser();
  document.querySelector("#code").value = userDetails[index].code;

  edited[0] = true;
  edited[1] = index;
  console.log(edited);
}
