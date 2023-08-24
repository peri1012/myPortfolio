//Get Json File
async function getAllData(){
  try {
    const data=await fetch("./assets/json/index.json")
    .then(res=>res.json())
    .then(all=>all)
    myInfo= data.myDetail;
    getMyDetail();
    images= data.slider;
    mapSwipperData();
    initializeSwipper();
    tabsInfo= data.skillsTabs;
    mapTabData();
    mapTabName();
    serviceData= data.services;
    mapServicesData();
    openAccordion();
    portfolioData = data.portfolios; 
    mapPortfolioData();
  } catch (error) {
      console.log(error)
  }
}
getAllData();
// End this code

//Header info
const picture = document.querySelector(".picture");
let myInfo=[];
const personalDetail = document.querySelector(".portfolio-detail");
function getMyDetail(){
  myInfo.map(item=>{
    personalDetail.innerHTML=`
    <ul class="myInfo">
        <li class="myName">${item.fullName}</li>
        <li class="myInfo-contact"> <a href="mailto:${item.email}" target="_blank">${item.email}</a></li>
        <li class="myInfo-contact"><a href="tel:${item.mobilePhone}" target="_blank" class="mobile-phone">${item.mobilePhone}</a></li>
    </ul>`
  })
}
picture.addEventListener("click", () => {
  personalDetail.classList.toggle("active");
});
// End header


//start Slider
let images=[];
const swiperWrapper=document.querySelector(".swiper-wrapper");
function mapSwipperData() {
    images.map((item) => {
      swiperWrapper.innerHTML += `
      <div class="swiper-slide">
          <img src="${item.imgUrl}" alt="${item.imgTitle}">
          <div class="swiper-content">
              <h1>${item.swiperContent.title}</h1>
              <a href="#" class="letKnow">${item.swiperContent.linkTitle}</a>
          </div>
      </div>
      `;
});

const letKnowElements = document.querySelectorAll(".letKnow");

letKnowElements.forEach((item, index) => {
  item.addEventListener("click", () => {
    const description = images[index].swiperContent.description;
    letKnowElements.forEach((remove, i) => {
      if (index !== i) {
        remove.classList.remove("active");
        remove.innerHTML = images[i].swiperContent.linkTitle;
      }
    });
    item.classList.toggle("active");
    if (item.classList.contains("active")) {
      item.innerHTML = `
        <p class="info">${description}</p>
      `;
    } 
    else {
      item.innerHTML = images[index].swiperContent.linkTitle;
    }
  });
});
}
function initializeSwipper(){
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
// End slider


//Start tab
let tabs = document.querySelectorAll(".tabs h3");
let tabDetails = document.querySelectorAll(".tab-info");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabDetails.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabDetails[index].classList.add("active");
    tabs[index].classList.add("active");
  });
});
let tabsInfo=[];
function mapTabData() {
  tabDetails.forEach((tabDetail, index) => {
    const tab = tabsInfo[index];
    tabDetail.innerHTML = `
      <ul class="skills">
        ${tab.skills.map(skill => `<li class="skill-item">${skill}</li>`).join('')}
      </ul>`;
  });
}
function mapTabName() {
  tabs.forEach((tab, index) => {
    const tabInfo = tabsInfo[index];
    tab.textContent = tabInfo.title;
  });
}
//End tab

//Start Accordion
let serviceData=[];
const services=document.querySelector(".accordion");
function mapServicesData() {
  serviceData.map((item) => {
    services.innerHTML += `
    <div class="accordion-detail ">
        <div class="label">${item.title}</div>
        <div class="content">${item.description}</div>
    </div>
    `;
  });
}

function openAccordion() {
  const accordion = document.querySelectorAll('.accordion-detail');
  accordion.forEach((accordionDetail) => {
    accordionDetail.addEventListener('click', ()=> {
      accordion.forEach(checkAccordion =>{
        if(checkAccordion != accordionDetail){
          checkAccordion.classList.remove('active')
        }else{
          accordionDetail.classList.toggle('active');
        }
      })
    });
  });
}
//End Accordion


//start Portfolio
let portfolioData = [];
const portfolio = document.querySelector('.cards');
function mapPortfolioData() {
  portfolioData.map((item) => {
        portfolio.innerHTML += `
        <div class="card">
            <div class="card-image ">
                <img src="${item.imgUrl}" alt="${item.title}">
                <div class="image-hover">
                    <div class="image-info">
                        <p class="project-name">${item.title}</p>
                        <span class="project-description">${item.description}</span>
                    </div>
                    <div class="learn-more" id="${item.id}">
                        <button class="btn">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
        `;
      });
}
//End Portfolio

