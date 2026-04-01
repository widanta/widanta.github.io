document.addEventListener("DOMContentLoaded", () => {
    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const htmlElement = document.documentElement;

    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        htmlElement.setAttribute("data-bs-theme", savedTheme);
        updateIcon(savedTheme);
    } else {
        // Fallback to system preference if no save
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        htmlElement.setAttribute("data-bs-theme", prefersDark ? "dark" : "light");
        updateIcon(prefersDark ? "dark" : "light");
    }

    // Toggle theme on click
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        htmlElement.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === "dark") {
            themeIcon.classList.remove("bi-moon-stars-fill");
            themeIcon.classList.add("bi-sun-fill");
        } else {
            themeIcon.classList.remove("bi-sun-fill");
            themeIcon.classList.add("bi-moon-stars-fill");
        }
    }

    // --- Dynamic Year for Footer ---
    document.getElementById("year").textContent = new Date().getFullYear();

    // --- Initialize AOS (Animate On Scroll) ---
    AOS.init({
        once: true,
        offset: 100,
        easing: "ease-in-out",
    });

    // --- GSAP Typing Effect ---
    gsap.registerPlugin(TextPlugin);
    gsap.to(".p-about", {
        duration: 8,
        text: "Hai saya I Made Widanta Abdi Nugraha. Saya seorang mahasiswa Sistem Informasi di Denpasar, Bali. Berpengalaman melalui magang dan proyek *freelance* sebagai Web Developer dengan spesialisasi pengembangan Laravel & Integrasi API. Mampu mengoptimalkan UI yang responsif, terbiasa dengan Git/Github, dan selalu antusias merancang desain digital. Mari berkolaborasi!",
        ease: "none",
    });
});

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
