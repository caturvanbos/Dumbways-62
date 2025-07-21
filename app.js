// =========== TASK 5 =======================

const projects = [
  {
      title: "Dumbways Web App",
      duration: "3 bulan",
      description: "App that user for dumbways student, it was deployed and can download on playstore. Happy download",
      image: "gambar/img1.jpg",
      technologies: ["react JS", "Node JS"]
  },

  {
      title: "Dumbways Web App 2",
      duration: "3 bulan",
      description: "App that user for dumbways student, it was deployed and can download on playstore. Happy download",
      image: "gambar/img1.jpg",
      technologies: ["react JS", "Node JS"]
  }

]

for (let i = 0; i < projects.length; i++) {
const project = projects[i];

let iconsHTML = '';
for (let j = 0; j < project.technologies.length; j++) {
  const tech = project.technologies[j].toLowerCase();

  if (tech === "android") {
    iconsHTML += `<i class="fa-brands fa-android"></i>`;
  }
  if (tech === "java") {
    iconsHTML += `<i class="fa-brands fa-java"></i>`;
  }
  if (tech === "playstore") {
    iconsHTML += `<i class="fa-brands fa-google-play"></i>`;
  }
  if (tech === "node js") {
    iconsHTML += `<i class="fa-brands fa-node-js"></i>`;
  }
  if (tech === "react js") {
    iconsHTML += `<i class="fa-brands fa-react"></i>`;
  }
}

const cardHTML = `
<div class="col-md-6 col-lg-4">
  <div class="card mb-4 shadow-sm">
    <img src="${project.image}" class="card-img-top" alt="${project.title}">
    <div class="card-body">
      <h5 class="card-title">${project.title}</h5>
      <p class="card-text">${project.description}</p>
      <div class="icons">${iconsHTML}</div> <!-- Tambah icon di sini -->
      <p class="text-muted">Durasi: ${project.duration}</p>
      <div class="row g-2 mt-3">
        <div class="col-6">
          <button class="btn btn-primary w-100">Edit</button>
        </div>
        <div class="col-6">
          <button class="btn btn-danger w-100">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

document.querySelector(".wrapper").insertAdjacentHTML("beforeend", cardHTML);
}

// =========== TASK 5 =======================

const form = document.getElementById("projectForm");

form.addEventListener("submit", function(e) {
e.preventDefault();

const projectName = form.querySelector('input[type="text"]').value;
const startDate = document.getElementById("start-date").value;
const endDate = document.getElementById("end-date").value;
const description = form.querySelector("textarea").value;

const techCheckboxes = document.querySelectorAll('.tech-grup input[type="checkbox"]');
let technologies = [];

techCheckboxes.forEach(checkbox => {
  if (checkbox.checked) {
    const label = checkbox.nextElementSibling.textContent.trim();
    technologies.push(label.toLowerCase()); // Perbaikan: simpan label lowercase supaya konsisten
  }
});

function getDuration(start, end) {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diffTime = Math.abs(endTime - startTime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} hari`;
}

const duration = getDuration(startDate, endDate);

// Encode JSON agar aman dimasukkan di atribut data-tech
const encodedTech = encodeURIComponent(JSON.stringify(technologies));

const cardHTML = `
  <div class="container-header-project project-card"
       data-title='${projectName}'
       data-start='${startDate}'
       data-end='${endDate}'
       data-duration='${duration}'
       data-description='${description}'
       data-image='gambar/img1.jpg'
       data-tech='${encodedTech}'>
    <div class="img">
      <img src="gambar/img1.jpg" alt="">
    </div>
    <div class="dumbways">
      <h4>${projectName}</h4>
      <p>durasi : ${duration}</p>
    </div>
    <p>${description}</p>
    <div class="icons">
      <!-- Icon di card bisa disesuaikan kalau mau -->
    </div>
    <div class="submit-2">
      <button>edit</button>
      <button>delete</button>
    </div>
  </div>
`

const wrapper = document.querySelector(".wrapper");
wrapper.insertAdjacentHTML("beforeend", cardHTML);

const newCard = wrapper.lastElementChild;

newCard.addEventListener("click", function () {
  const title = this.getAttribute("data-title");
  const start = this.getAttribute("data-start");
  const end = this.getAttribute("data-end");
  const durationText = this.getAttribute("data-duration");
  const description = this.getAttribute("data-description");
  const imageSrc = this.getAttribute("data-image");
  // Decode dulu baru parse JSON
  const techList = JSON.parse(decodeURIComponent(this.getAttribute("data-tech")));

  let techHTML = '';
  techList.forEach(tech => {
    const value = tech.toLowerCase();
    if (value === "node js") techHTML += `<div class="tech-item"><i class="fa-brands fa-node-js"></i><span>Node JS</span></div>`;
    if (value === "react js") techHTML += `<div class="tech-item"><i class="fa-brands fa-react"></i><span>React JS</span></div>`;
    if (value === "express js") techHTML += `<div class="tech-item"><img src="gambar/expressjs.svg" style="width: 20px;" /><span>Express JS</span></div>`;
    if (value === "type script") techHTML += `<div class="tech-item"><i class="fa-solid fa-code"></i><span>TypeScript</span></div>`;
  });

  const detailBox = document.querySelector(".container-web-app");

  detailBox.innerHTML = `
    <h1>${title}</h1>
    <div class="wrapper-web">
      <div class="img-web">
        <img src="${imageSrc}" alt="">
      </div>
      <div class="duration">
        <h4>duration</h4>
        <div class="icon-teks">
          <i class="fa-solid fa-calendar"></i>
          <span>${start} - ${end}</span>
        </div>
        <div class="icon-teks">
          <i class="fa-regular fa-clock"></i>
          <span>${durationText}</span>
        </div>
        <div class="technologies-web">
          <h4>technologies</h4>
          <div class="tech-row">${techHTML}</div>
        </div>
      </div>
    </div>
    <div class="container-teks">
      <p>${description}</p>
    </div>
  `;
});
});
