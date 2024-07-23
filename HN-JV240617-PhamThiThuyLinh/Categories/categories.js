// const dbCate = JSON.parse(window.localStorage.getItem("categories")) || [];
let sort = document.getElementById("sort");
// lay button sang js de tao event
const btnAdd = document.getElementById("add");

// lay duoc the input
const inputCate = document.getElementById("inputCate");

const inputSearch = document.getElementById("input-search");
// console.log(inputCate);
// lay gia tri trong in put ra.value
// const
let inputGlobal = "";

let h2 = document.querySelector("h2");

// ADD
btnAdd.addEventListener("click", () => {
  const dbCate = JSON.parse(localStorage.getItem("categories")) || [];
  const cateName = inputCate.value.trim();
  //   confirm o input co rong k
  if (!cateName) {
    alert("Moi ban nhap thong tin");
    return;
  }

  //   check ten trung
  const index = dbCate.findIndex(
    (cate) => cate.name.toLowerCase() === cateName.toLowerCase()
  );
  if (index !== -1) {
    alert("Ten bi trung");
    return;
  }
  //   tao obj cho phan tu moi
  if (!inputGlobal) {
    let id = 1;
    if (dbCate.length > 0) {
      id = dbCate[dbCate.length - 1].id + 1;
    }
    const newCate = {
      id: id,
      name: cateName,
    };
    dbCate.push(newCate);
    window.localStorage.setItem("categories", JSON.stringify(dbCate));
    inputCate.value = "";
    renderCate();
  } else {
    const dbCate = JSON.parse(localStorage.getItem("categories")) || [];

    let findIndex = dbCate.findIndex((cate) => cate.id == inputGlobal);
    dbCate[findIndex].name = inputCate.value;

    window.localStorage.setItem("categories", JSON.stringify(dbCate));
    h2.innerHTML = "THÊM DANH MỤC";
    inputGlobal = null;
    renderCate();
  }
});

const lineCate = document.getElementById("lineCate");
function renderCate() {
  // lay db
  let dbCate = JSON.parse(window.localStorage.getItem("categories")) || [];

  dbCate = dbCate.filter((e) =>
    e.name.toLowerCase().includes(inputSearch.value.trim().toLowerCase())
  );

  if (sort.value == "az") {
    dbCate.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    dbCate.sort((a, b) => b.name.localeCompare(a.name));
  }

  let stringHTML = "";
  for (let i = 0; i < dbCate.length; i++) {
    stringHTML += `
    <tr class="add-area">
         <td>${dbCate[i].id}</td>
         <td id="nameCate">${dbCate[i].name}</td>
         <td>
         <button id="add" onclick = "update(${dbCate[i].id})">Sửa</button>
         <button id="cancel" onclick="deleteF(${dbCate[i].id})">Xoá</button>

         </td>
      </tr>
    `;
  }
  // + chuoi
  lineCate.innerHTML = stringHTML;

  // inner HTML
}
renderCate();

function deleteF(id) {
  const dbCate = JSON.parse(localStorage.getItem("categories")) || [];
  let findIndex = dbCate.findIndex((cate) => cate.id == id);
  console.log(findIndex);
  console.log(id);
  dbCate.splice(findIndex, 1);
  window.localStorage.setItem("categories", JSON.stringify(dbCate));
  renderCate();
}
function update(id) {
  const dbCate = JSON.parse(localStorage.getItem("categories")) || [];
  let findIndex = dbCate.findIndex((cate) => cate.id == id);
  inputCate.value = dbCate[findIndex].name;
  h2.innerHTML = "SỬA DANH MỤC";
  inputGlobal = dbCate[findIndex].id;
}
function search() {
  renderCate();
}
search();

sort.addEventListener("change", function () {
  renderCate();
});
