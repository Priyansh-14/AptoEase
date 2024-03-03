// Get the form elements as an array
const formElements = Array.from(document.querySelector(".form").children);

// Animate form elements with increasing delay
formElements.forEach((item, i) => {
  setTimeout(() => {
    item.style.opacity = 1;
  }, i * 100);
});

// Get the home button element
const homeBtn = document.querySelector(".home-btn");

// Add a click event listener to the home button
homeBtn.addEventListener("click", () => {
  setTimeout(() => {
    // Redirect to the index.html page after a delay
    document.location.href = "index.html";
  }, 300);
});

// Get the registration form element
const form = document.getElementById("reg-form");

// Add a submit event listener to the registration form
form.addEventListener("submit", registerUser);

// Function to handle user registration
async function registerUser(event) {
  event.preventDefault();

  // Get user input values
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Send a POST request to the server for registration
  const result = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).then((res) => res.json());

  // Check the registration result
  if (result.status === "ok") {
    // Redirect to the index.html page
    window.location.href = "login.html";
  } else {
    // Display an alert if there's an error during registration
    alert(result.error);
  }
}
