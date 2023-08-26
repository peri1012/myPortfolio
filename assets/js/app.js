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
                        </div>
                    <div class="learn-more" id="${item.id}">
                      <p class="project-description">${item.description}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
      });
}
//End Portfolio

//Start Form
// CommonJS

const button=document.querySelector('.btn');
let form=[];
button.addEventListener("click",(e)=>{
  e.preventDefault();
  const name=document.querySelector('#name');
  const surname=document.querySelector('#surname');
  const email=document.querySelector('#email');
  const message=document.querySelector('#message');
  if (validation(name.value, surname.value, email.value, message.value)) {
      const obj = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        message: message.value
      };
      form.push(obj);
      // console.log(form);
      //sweetAlert
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your message is successful',
        showConfirmButton: false,
        timer: 1500
      });
      name.value='';
      surname.value='';
      email.value='';
      message.value='';
  };
 
})
const emailRegEx=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regName =/^[A-Za-z\-]+$/;
const regSurname = /^[A-Za-z\-]+$/;
const messageRegEx=/^.{30,}$/;

const nameErrorMsg=document.querySelector('.nameError-message');
const surnameErrorMsg=document.querySelector('.surnameError-message');
const emailErrorMsg=document.querySelector('.emailError-message');
const textErrorMsg=document.querySelector('.textError-message');
function validation(name,surname,email,message){
  let isValid=true;
  if(!regName.test(name)){
    nameErrorMsg.textContent='Invalid: Enter Your Name correctly'
    isValid= false;
  }else{
    nameErrorMsg.textContent="";
    isValid=true;
  }
  if(!regSurname.test(surname)){
    surnameErrorMsg.textContent="Invalid: Enter Your Surname correctly"
    isValid= false;
  }else{
    surnameErrorMsg.textContent="";
    isValid=true;
  }
  if(!emailRegEx.test(email)){
    emailErrorMsg.textContent="Invalid : Check Your Email"
    isValid= false;
  }else{
    emailErrorMsg.textContent="";
    isValid=true;
  }
  if(!messageRegEx.test(message)){
    textErrorMsg.textContent="Invalid : at least 30 characters"
    isValid= false;
  }else{
    textErrorMsg.textContent="";
    isValid=true;
  }
  return isValid;
}

//End Form

//Start Date
const year=document.querySelector(".year");
let today = new Date();
today = today.getFullYear();
year.textContent=today;
//End Date

let about=document.querySelector('a[href="#about"]');
about.addEventListener('click',(e)=>{
  e.preventDefault();
  let sectionAbout=document.querySelector('#about');
  sectionAbout.scrollIntoView({behavior:'smooth'});
});

let service=document.querySelector('a[href="#services"]');
service.addEventListener('click',(e)=>{
  e.preventDefault();
  let sectionServices=document.querySelector('#services');
  sectionServices.scrollIntoView({behavior:'smooth'});
});

let portfolios=document.querySelector('a[href="#portfolio"]');
portfolios.addEventListener('click',(e)=>{
  e.preventDefault();
  let sectionPortfolio=document.querySelector('#portfolio');
  sectionPortfolio.scrollIntoView({behavior:'smooth'});
});

let contacts=document.querySelector('a[href="#contact"]');
contacts.addEventListener('click',(e)=>{
  e.preventDefault();
  let sectionContact=document.querySelector('#contact');
  sectionContact.scrollIntoView({behavior:'smooth'});
});