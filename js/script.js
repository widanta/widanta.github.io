// scroll top
const scrollTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    scrollTop.classList.add("active");
  } else {
    scrollTop.classList.remove("active");
  }
});

// script contact form
const scriptURL = "https://script.google.com/macros/s/AKfycbyrVWW2XxaTjYDGe3LlNBsiXRkB2gxM_5gpjno-kBWcrD9hL-uYJRlCG9T6DR2DHrjj/exec";
const form = document.forms["Contact-Form"];

const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //ketika tombol loading
  //tampilkan tombol loading, hilangkan tombol kirim
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      //tampilkan tombol kirim, hilangkan tombol loading
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      //tampilkan alert
      myAlert.classList.toggle("d-none");
      //reset
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
