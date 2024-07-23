// const projectList = [
//   {
//     id: 1,
//     project: "Shopee",
//     img: "./img/shopee.jpg",
//     tech: "ReactJS, NodeJS, MySQL, Docker",
//     github: "https://github.com/guanguans/favorite-link.git",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, suscipit.",
//   },
//   {
//     id: 2,
//     project: "Lazada",
//     img: "./img/lazada.jpg",
//     tech: "VueJS, Java, SQL Server,AWS",
//     github: "https://github.com/guanguans/favorite-link.git",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, suscipit.",
//   },
//   {
//     id: 3,
//     project: "Tiktok",
//     img: "./img/tiktok.jpg",
//     tech: "NextJS, NodeJS, Oracle, AWS",
//     github: "https://github.com/guanguans/favorite-link.git",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, suscipit.",
//   },
// ];
// window.localStorage.setItem("projectList", JSON.stringify(projectList));
// let curDate = new Date();
// let curDay = curDate.getDate();
// console.log(curDay);
const projectList = JSON.parse(window.localStorage.getItem("projectList"));

// ================================
const addProjectForm = document.querySelector(".add-project-form");
const inputProjectBtn = document.querySelector(".btn-add-project");
const btnAddForm = document.querySelector(".btn-form-add-project");
const btnUpdateForm = document.querySelector(".btn-form-update-project");
const btnCancelForm = document.querySelector(".btn-form-cancel");
const projectLine = document.getElementById("project-line");
const inputProject = document.getElementById("input-project");
const inputImage = document.getElementById("img-project-add");
const inputTech = document.getElementById("project-tech");
const inputGithub = document.getElementById("project-github");
const inputDescription = document.getElementById("description");
let formTitle = document.querySelector(".title");
let idGlobal = null;

// ================================
function renderProjectList() {
  const projectList =
    JSON.parse(window.localStorage.getItem("projectList")) || [];

  let stringHTML = "";
  for (let i = 0; i < projectList.length; i++) {
    stringHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${projectList[i].project}</td>
      <td class="img" ><img src="${projectList[i].img}" alt="" /></td>
      <td>${projectList[i].tech}</td>
      <td class="btn">
        <button class="updateBtn" onclick="updateProjectLine(${
          projectList[i].id
        })">
          Sửa
        </button>
        <button onclick="deleteProjectLine(${projectList[i].id})">Xoá</button>
      </td>
    </tr>
    `;
  }
  projectLine.innerHTML = stringHTML;
}
renderProjectList();
// ==============CLICK ADD HIEN FORM THEM==================
function displayForm() {
  addProjectForm.style.display = "block";
}

// ==============IMG ==> 64BASE==========================
// let url;
// inputImage.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.onloadend = function () {
//     url = reader.result;
//     document.getElementById("img-product-add").src = reader.result;
//   };
//   reader.readAsDataURL(file);
// });
// ==============CLICK ADD in FORM THEM==================
function addNewProject() {
  const projectList =
    JSON.parse(window.localStorage.getItem("projectList")) || [];
  // CHECK INPUT VALUE========================
  let newProject = inputProject.value.trim();
  let newProjectImage = inputImage.value;
  let newTech = inputTech.value.trim();
  let newGithub = inputGithub.value.trim();
  let newDescription = inputDescription.value.trim();

  if (
    newProject == "" ||
    newProjectImage == "" ||
    newTech == "" ||
    newGithub == "" ||
    newDescription == ""
  ) {
    alert("Mời bạn nhập lại thông tin");
    return;
  }
  // VALIDATE DATA============================
  const index = projectList.findIndex(
    (project) => project.project.toLowerCase() === newProject.toLowerCase()
  );
  if (index !== -1) {
    alert("Project đã có");
    return;
  }
  // TAO OBJECT MOI SAVE LOCAL STORAGE========================

  let id = 1;
  if (!projectList.length == 0) {
    id = projectList[projectList.length - 1].id + 1;
  }
  const newProjectLine = {
    id: id,
    project: newProject,
    img: newProjectImage,
    tech: newTech,
    github: newGithub,
    description: newDescription,
  };
  projectList.push(newProjectLine);
  window.localStorage.setItem("projectList", JSON.stringify(projectList));
  addProjectForm.style.display = "none";
  renderProjectList();
}
// ==============CLICK CANCEL in FORM THEM==================
function cancelForm() {
  addProjectForm.style.display = "none";
}
// =================DELETE PROJECT LINE in TABLE==================
function deleteProjectLine(id) {
  const projectList =
    JSON.parse(window.localStorage.getItem("projectList")) || [];
  const index = projectList.findIndex((project) => project.id === id);
  projectList.splice(index, 1);
  window.localStorage.setItem("projectList", JSON.stringify(projectList));
  renderProjectList();
}
// =================UPDATE PROJECT LINE in TABLE==================
function updateProjectLine(id) {
  const projectList =
    JSON.parse(window.localStorage.getItem("projectList")) || [];
  formTitle.innerHTML = "SỬA DỰ ÁN";
  // display form
  addProjectForm.style.display = "block";
  btnUpdateForm.style.display = "block";
  btnAddForm.style.display = "none";

  // find object in projectList
  const index = projectList.findIndex((project) => project.id === id);
  inputProject.value = projectList[index].project;
  inputImage.value = projectList[index].img;
  inputTech.value = projectList[index].tech;
  inputGithub.value = projectList[index].github;
  inputDescription.value = projectList[index].description;
  idGlobal = projectList[index].id;
}
function updateProject() {
  const projectList =
    JSON.parse(window.localStorage.getItem("projectList")) || [];
  const index = projectList.findIndex((project) => project.id === idGlobal);
  console.log(idGlobal);
  const indexCheck = projectList.findIndex(
    (project) =>
      project.project.toLowerCase() == inputProject.value.toLowerCase()
  );
  console.log(indexCheck);
  if (indexCheck !== -1 && projectList[indexCheck].id !== idGlobal) {
    alert("Project đã có");
    updateProjectLine();
  }
  console.log(inputTech.value);
  projectList[index].project = inputProject.value;
  projectList[index].img = inputImage.value;
  projectList[index].tech = inputTech.value;
  projectList[index].github = inputGithub.value;
  projectList[index].description = inputDescription.value;

  window.localStorage.setItem("projectList", JSON.stringify(projectList));
  formTitle.innerHTML = "Thêm mới dự án";
  idGlobal = null;
  renderProjectList();
}
// } else {
//   const projectList =
//     JSON.parse(window.localStorage.getItem("projectList")) || [];
//   const index = projectList.findIndex((project) => project.id === idGlobal);
//   const newProjectList = projectList.slice(index, 1);
//   const indexCheck = newProjectList.findIndex(
//     (project) =>
//       project.project.toLowerCase() == inputProject.value.toLowerCase()
//   );
//   if (indexCheck !== -1) {
//     alert("Project đã có");
//   }
//   projectList[index].project = inputProject.value;
//   projectList[index].img = inputImage.value;
//   projectList[index].tech = inputTech.value;
//   projectList[index].github = inputGithub.value;
//   projectList[index].description = inputDescription.value;

//   window.localStorage.setItem("projectList", JSON.stringify(projectList));
//   formTitle.innerHTML = "Thêm mới dự án";
//   idGlobal = null;
//   renderProjectList();
// }
