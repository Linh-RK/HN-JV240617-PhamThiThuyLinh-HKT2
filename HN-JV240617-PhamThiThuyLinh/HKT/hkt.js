const myTechDisplay = document.querySelector(".tech-stack-icon");
const myProject = document.querySelector(".projects-item");
function renderMyTech() {
  const myTech = JSON.parse(window.localStorage.getItem("skillList"));
  console.log(myTech);
  let stringHTML = "";
  for (let i = 0; i < myTech.length; i++) {
    stringHTML += `
        <div><img src="${myTech[i].img}" alt="logo" /></div>
        `;
  }
  myTechDisplay.innerHTML = stringHTML;
}
renderMyTech();
// =======================
function renderProject() {
  const projectList = JSON.parse(window.localStorage.getItem("projectList"));
  let stringHTML = "";
  for (let i = 0; i < projectList.length; i++) {
    stringHTML += `
    <div class="projects-item">
          <div class="item">
            <div class="img img1">
            <img src="${projectList[i].img}" alt=""></div>
            <div class="project-content">
              <div class="title">${projectList[i].project}</div>
              <div class="content">
              ${projectList[i].description}
              </div>
              <div class="stack">
                Tech stack : <span>${projectList[i].tech}</span>
              </div>
              <div class="link">
                <div class="view-code">
                  <i class="fa-brands fa-github"></i>
                  <a href="${projectList[i].github}">${projectList[i].github}</a>
                </div>
              </div>
            </div>
          </div>
    `;
  }
  myProject.innerHTML = stringHTML;
}
renderProject();
