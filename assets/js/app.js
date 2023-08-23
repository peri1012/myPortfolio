const picture = document.querySelector(".picture");

picture.addEventListener("click", () => {
  const personalDetail = document.querySelector(".portfolio-detail");
  personalDetail.classList.toggle("active");
});

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

  const letKnow = document.querySelector(".letKnow");

  letKnow.addEventListener("click", () => {
    letKnow.innerHTML=`
    <p class="info">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem facilis at dicta aut autem. Nobis tempore tenetur quam consectetur sed sapiente numquam perspiciatis blanditiis ipsum ad, consequatur facilis ratione velit!</p>`
  });


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

const accordion = document.querySelectorAll('.accordion-detail');

for (i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}