// const skillList = [
//   {
//     id: 1,
//     skill: "ReactJS",
//     img: "./img/react.png",
//     date: "20/05/2024",
//   },
//   {
//     id: 2,
//     skill: "VueJS",
//     img: "./img/vue.png",
//     date: "20/05/2024",
//   },
//   {
//     id: 3,
//     skill: "Java",
//     img: "./img/java.png",
//     date: "20/05/2024",
//   },
//   {
//     id: 4,
//     skill: "Next.js",
//     img: "./img/next.png",
//     date: "20/05/2024",
//   },
// ];
// window.localStorage.setItem("skillList", JSON.stringify(skillList));
// let curDate = new Date();
// let curDay = curDate.getDate();
// console.log(curDay);
const skillList = JSON.parse(window.localStorage.getItem("skillList"));

// ================================
const addSkillForm = document.querySelector(".add-skill-form");
const inputSkillBtn = document.querySelector(".btn-add-skill");
const btnAddForm = document.querySelector(".btn-form-add-skill");
const btnCancelForm = document.querySelector(".btn-form-cancel");
const skillLine = document.getElementById("skill-line");
const inputSkill = document.getElementById("input-skill");
const inputImage = document.getElementById("img-skill-add");
// ================================
function renderSkillList() {
  const skillList = JSON.parse(window.localStorage.getItem("skillList")) || [];

  let stringHTML = "";
  for (let i = 0; i < skillList.length; i++) {
    stringHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${skillList[i].skill}</td>
      <td class="img" ><img src="${skillList[i].img}" alt="" /></td>
      <td>${skillList[i].date}</td>
      <td class="btn">
      <button onclick="deleteSkillLine(${skillList[i].id})">Xoá</button>
      </td>
    </tr>
    `;
  }
  skillLine.innerHTML = stringHTML;
}
renderSkillList();
// ==============CLICK ADD HIEN FORM THEM==================
function displayForm() {
  addSkillForm.style.display = "block";
}
// ==============CLICK ADD in FORM THEM==================

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
// =============================
function addNewSkill() {
  const skillList = JSON.parse(window.localStorage.getItem("skillList")) || [];
  // VALIDATE DATA========================
  let newSkill = inputSkill.value.trim();
  let newSkillImage = inputImage.value;
  console.log(inputImage.value);
  console.log(newSkill);
  console.log(newSkillImage);
  if (newSkill == "" || newSkillImage == "") {
    alert("Mời bạn nhập lại thông tin");
    return;
  }
  const index = skillList.findIndex(
    (skill) => skill.skill.toLowerCase() === newSkill.toLowerCase()
  );
  if (index !== -1) {
    alert("Skill đã có");
    return;
  }
  // TAO OBJECT MOI SAVE LOCAL STORAGE========================
  let id = 1;
  if (!skillList.length == 0) {
    id = skillList[skillList.length - 1].id + 1;
  }
  const newSkillLine = {
    id: id,
    skill: newSkill,
    // img: url,
    img: newSkillImage,
    date: "20/05/2024",
  };
  skillList.push(newSkillLine);
  window.localStorage.setItem("skillList", JSON.stringify(skillList));
  addSkillForm.style.display = "none";
  renderSkillList();
}
// ==============CLICK CANCEL in FORM THEM==================
function cancelForm() {
  addSkillForm.style.display = "none";
}
// =================DELETE SKILL LINE in TABLE==================
function deleteSkillLine(id) {
  const skillList = JSON.parse(window.localStorage.getItem("skillList")) || [];
  const index = skillList.findIndex((skill) => skill.id === id);
  skillList.splice(index, 1);
  window.localStorage.setItem("skillList", JSON.stringify(skillList));
  renderSkillList();
}
// ==================================================================
