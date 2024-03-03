//LOADER
const loaderTextOptions = ["Blockchain", "AptoEase Loading", "Stay Calm"];

// Function to change loader text dynamically
function changeLoaderText() {
  const loaderText = document.getElementById("loader-text");
  let currentIndex = 0;

  setInterval(() => {
    loaderText.textContent = loaderTextOptions[currentIndex];
    currentIndex = (currentIndex + 1) % loaderTextOptions.length;
  }, 600); // Change text every second
}

changeLoaderText();

function showLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = `
    <span class="loader-text">AptoEase</span>
    <span class="load"></span>
  `;

  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.appendChild(loader);

  loader.style.display = "block";
}

window.addEventListener("load", () => {
  setTimeout(() => {
    hideLoader();
  }, 2200);
});

// Function to hide the loader
function hideLoader() {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "none";
}
//LOADER ENDS

// Check if the user is logged in (you can use sessionStorage for this)
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

function showUserProfile(username) {
  const usernameElement = document.getElementById("username");
  usernameElement.textContent = username[0].toUpperCase();
}

// Function to update the navigation menu based on login status
function updateNavigationMenu() {
  const userIconLink = document.getElementById("user-icon");
  const userDropdown = document.getElementById("login");

  if (isLoggedIn) {
    // User is logged in, show the dropdown icon
    const username = sessionStorage.getItem("username");
    userIconLink.style.display = "none";
    userDropdown.style.display = "block";
    showUserProfile(username);
  } else {
    // User is not logged in, show the user icon as a link
    userIconLink.style.display = "block";
    userDropdown.style.display = "none";
  }
}

///////////////////////
function logout() {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  const userIconLink = document.getElementById("user-icon");
  const userDropdown = document.getElementById("login");
  userIconLink.style.display = "block";
  userDropdown.style.display = "none";
}

// Initialize the navigation menu based on login status
updateNavigationMenu();

// Add event listener to the logout link
const logoutLink = document.getElementById("logout-link");
if (logoutLink) {
  logoutLink.addEventListener("click", () => {
    // Call the logout function when the user clicks the logout link
    logout();
  });
}

// JavaScript to hide and show navbar on scroll
let prevScrollPos = window.scrollY;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.transform = "translateY(0)";
  } else {
    navbar.style.transform = "translateY(-100%)";
  }
  prevScrollPos = currentScrollPos;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Back to home button functionality
const backToHomeButton = document.getElementById("backToHome");

backToHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
