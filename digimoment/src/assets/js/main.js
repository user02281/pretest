import { imgCarouselTemplate } from "../context/dataCarouselTemp.js";
import { marqueeItemsList } from "../context/dataMarqueList.js";
import { jumbotronItems } from "../context/dataJumbotron.js";
import { pricingData, headerContent} from "../context/dataPricing.js";
import { footerData } from "../context/dataFooter.js";



// Fungsi untuk memperbarui jumbotron
function updateJumbotron() {
  const container = document.getElementById("jumbotron");
  container.innerHTML = ""; // Bersihkan kontainer sebelum menambahkan konten baru

  jumbotronItems.forEach((item) => {
    // Elemen <h1>
    const h1 = document.createElement("h1");
    h1.className= "p-10 text-5xl font-medium flex gap-2 justify-center items-center flex-col -tracking-wider text-center";
    h1.innerHTML = `
      <span>${item.title} <span class="font-dancing">Aestetich</span> <span>${item.subtitle}</span></span>
      <span class="line-through text-3xl decoration-red-600 decoration-4 text-zinc-400">${item.oldPrice}</span>
      <span class="font-bold border bg-secondary text-primary rounded-md   text-3xl p-2">
        <span id="price"></span>
      </span>
    `;

    // Elemen <p>
    const p = document.createElement("p");
    p.classList.add("w-[80%]", "text-center");
    p.textContent = item.description;

    // Tambahkan elemen ke kontainer
    container.appendChild(h1);
    container.appendChild(p);

    // Animasi typing pada elemen harga baru
    new Typed("#price", {
      strings: item.newPrice,  // Array string untuk animasi typing
      typeSpeed: 50,          // Kecepatan mengetik
      backSpeed: 50,          // Kecepatan menghapus
      backDelay: 2000,        // Delay sebelum menghapus teks
      loop: true,             // Animasi berulang
      showCursor: true,       // Menampilkan kursor
      cursorChar: "👈🏼",        // Karakter kursor
    });
  });
}

document.addEventListener("DOMContentLoaded", updateJumbotron);

// carousel template 
function renderCarousel() {
  const carouselContainer = document.getElementById("carouselTemplate");
  carouselContainer.innerHTML = "";
  
  imgCarouselTemplate.forEach((item) => {
    const carouselItem = document.createElement("div");
    carouselItem.className="carousel-item w-full h-full m-auto p-2 bg-secondary";
    
    const img = document.createElement("img");
    img.src = item.imgSrc;
    img.alt = item.alt;
    img.className ="w-full object-cover rounded-xl";
    img.setAttribute("data-aos", "fade-up");
    img.setAttribute("data-aos-duration", "1500");

    img.onerror = function() {
      console.error(`Failed to load image: ${item.imgSrc}`);
    };
    
    carouselItem.appendChild(img);
    carouselContainer.appendChild(carouselItem);
  });
  AOS.init();
}
document.addEventListener("DOMContentLoaded", renderCarousel);
// carousel template 



// marquee list
function marqueeHeader() {
  const marqueeList = document.getElementById("marqueeList");
  // Jumlah total item yang diinginkan
  const totalItemsMarquee = 100;

  // Loop hingga mencapai totalItems
  for (let i = 0; i < totalItemsMarquee; i++) {
    const originalItem = marqueeItemsList[i % marqueeItemsList.length]; // Ambil item dengan indeks modular
    const listItem = document.createElement("li");
    listItem.classList.add("flex", "gap-2", "items-center");
    const img = document.createElement("img");
    img.src = originalItem.imgSrc;
    img.width = 15;
    img.alt = "Icon";
    const text = document.createElement("p");
    text.textContent = `${originalItem.text} `;
    listItem.appendChild(img);
    listItem.appendChild(text);
    marqueeList.appendChild(listItem);
  }
}
document.addEventListener("DOMContentLoaded", marqueeHeader);
// marquee list

const renderHeader = () => {
  const headerContainer = document.getElementById("pricing-header");
  headerContainer.innerHTML = `
    <h2 class="text-3xl font-semibold">${headerContent.title}</h2>
    <p class="text-gray-600 mt-2">${headerContent.description}</p>
  `;
};
renderHeader();



/**
 * Format a number as Indonesian Rupiah currency
 * @param {number} amount - The number to format
 * @returns {string} - Formatted Rupiah string
 */
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
}


// Generate Pricing Cards Dynamically
const pricingCardsContainer = document.getElementById("pricing-cards");

pricingData.forEach((card) => {
  const cardElement = document.createElement("div");
  cardElement.className =
    "flex flex-col w-[350px] gap-2 grow border bg-secondary text-primary p-6 rounded-xl text-center";

  cardElement.innerHTML = `
        <h3 class="mb-4 text-2xl font-semibold">${card.title}</h3>
        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">${card.description}</p>
        <div class="flex justify-center items-baseline my-8 flex-wrap">
            <span class="mr-2 text-2xl font-extrabold">${formatRupiah(card.price)}</span>
            <span class="text-gray-500 dark:text-gray-400">${card.duration}</span>
        </div>
        <ul role="list" class="mb-8 space-y-4 text-left">
            ${card.features
              .map(
                (feature) => `
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 ${
                          feature.isChecked
                            ? "text-green-500 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="${
                              feature.isChecked
                                ? "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                : "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            }" clip-rule="evenodd"></path>
                        </svg>
                        <span>${feature.text}</span>
                    </li>
                `
              )
              .join("")}
        </ul>
        <a href="#" class="text-secondary bg-primary rounded-md p-3 font-bold">Get started</a>
    `;

  pricingCardsContainer.appendChild(cardElement);
});



document.addEventListener('DOMContentLoaded', () => {
  const footerContainer = document.getElementById('dynamicFooter');

  const renderSocialIcons = (socials) =>
    socials
      .map(
        (social) => `
          <a href="${social.url}" aria-label="${social.name}" target="_blank" class="hover:opacity-80">
            <img width="30" src="${social.icon}" alt="${social.name}" />    
          </a>
        `
      )
      .join('');

  footerContainer.innerHTML = `
    <footer class="footer  flex justify-center flex-col items-center  bg-secondary text-primary rounded-t-xl p-28">
      <div class="flex flex-col items-center justify-center text-center">
        <h1>${footerData.brand.name}</h1>
        <p>${footerData.brand.tagline}</p>
        <p class="text-center mt-4">${footerData.copyright}</p>
      </div>
      <nav class="socials flex justify-center gap-4">
        ${renderSocialIcons(footerData.socials)}
      </nav>
    </footer>
  `;
});





// copyright
function updateCopyright() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById('copyright');
    copyrightElement.innerHTML = `Copyright © ${currentYear} - All right reserved`;
}
updateCopyright();
// copyright
